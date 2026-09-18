export default async (request) => {
  try {
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          verified: false,
          message: "Method not allowed.",
        }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const body = await request.json();

    const {
      reference,
      expectedAmount,
      email,
      customerName,
      phone,
      cartItems,
    } = body;

    if (!reference) {
      return new Response(
        JSON.stringify({
          verified: false,
          message: "Payment reference is required.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const secretKey =
      // eslint-disable-next-line no-undef
      process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      console.error(
        "PAYSTACK_SECRET_KEY is not configured."
      );

      return new Response(
        JSON.stringify({
          verified: false,
          message:
            "Payment server is not configured correctly.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    /* =========================================
       VERIFY PAYMENT WITH PAYSTACK
       ========================================= */

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paystackData =
      await paystackResponse.json();

    if (!paystackResponse.ok || !paystackData.status) {
      console.error(
        "Paystack verification failed:",
        paystackData
      );

      return new Response(
        JSON.stringify({
          verified: false,
          message:
            paystackData.message ||
            "Paystack could not verify this payment.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const transaction =
      paystackData.data;


    /* =========================================
       CHECK PAYMENT STATUS
       ========================================= */

    if (transaction.status !== "success") {
      return new Response(
        JSON.stringify({
          verified: false,
          message:
            "The Paystack transaction was not successful.",
          status: transaction.status,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }


    /* =========================================
       CHECK PAYMENT AMOUNT
       ========================================= */

    const paidAmount = Number(
      transaction.amount
    );

    const expected = Number(
      expectedAmount
    );

    if (
      !Number.isFinite(expected) ||
      paidAmount !== expected
    ) {
      console.error(
        "Payment amount mismatch:",
        {
          paidAmount,
          expectedAmount: expected,
          reference,
        }
      );

      return new Response(
        JSON.stringify({
          verified: false,
          message:
            "Payment amount does not match the order total.",
          paidAmount,
          expectedAmount: expected,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }


    /* =========================================
       CHECK CUSTOMER EMAIL
       ========================================= */

    if (
      email &&
      transaction.customer?.email &&
      email.toLowerCase() !==
        transaction.customer.email.toLowerCase()
    ) {
      return new Response(
        JSON.stringify({
          verified: false,
          message:
            "Payment customer email does not match.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }


    /* =========================================
       PAYMENT VERIFIED
       ========================================= */

    console.log(
      "Payment successfully verified:",
      {
        reference,
        amount: paidAmount,
        email,
        customerName,
        phone,
      }
    );

    return new Response(
      JSON.stringify({
        verified: true,
        message: "Payment verified successfully.",

        payment: {
          reference: transaction.reference,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
          paidAt: transaction.paid_at,
          channel: transaction.channel,
          customerEmail:
            transaction.customer?.email || email,
        },

        order: {
          customerName,
          email,
          phone,
          cartItems,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {

    console.error(
      "Verify payment function error:",
      error
    );

    return new Response(
      JSON.stringify({
        verified: false,
        message:
          "An unexpected error occurred while verifying the payment.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};