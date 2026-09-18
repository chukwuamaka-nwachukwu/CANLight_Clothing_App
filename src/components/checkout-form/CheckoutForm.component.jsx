
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import PaystackPop from "@paystack/inline-js";

import { auth } from "../../utils/firebase/firebase.utils";

const CheckoutForm = ({ cartTotal, cartItems = [] }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMessage, setPaymentMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  /* =========================================================
     WATCH FIREBASE AUTHENTICATION
  ========================================================= */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);

      if (user) {
        setEmail(user.email || "");
        setCustomerName(user.displayName || "");
      } else {
        setEmail("");
        setCustomerName("");
      }
    });

    return unsubscribe;
  }, []);

  /* =========================================================
     TOTAL
  ========================================================= */

  const total = Number(cartTotal || 0);

  const amountInKobo = Math.round(total * 100);

  const formattedTotal = total.toLocaleString("en-NG");

  /* =========================================================
     PAYMENT SUCCESS
  ========================================================= */

  const handlePaymentSuccess = async (response) => {
    try {
      setIsVerifying(true);

      setPaymentMessage(
        "Payment received. Verifying your payment..."
      );

      const verificationResponse = await fetch(
        "/.netlify/functions/verify-payment",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            reference: response.reference,
            expectedAmount: amountInKobo,
            email,
            customerName,
            phone,
            cartItems,
            userId: currentUser?.uid || null,
          }),
        }
      );

      const verificationData =
        await verificationResponse.json();

      if (!verificationResponse.ok) {
        throw new Error(
          verificationData.message ||
            "Payment verification failed."
        );
      }

      if (!verificationData.verified) {
        throw new Error(
          verificationData.message ||
            "Payment could not be verified."
        );
      }

      console.log(
        "Paystack verification result:",
        verificationData
      );

      setPaymentMessage(
        `Payment successful! Reference: ${response.reference}`
      );

      alert(
        `Payment successful!\n\nReference: ${response.reference}`
      );

      /*
       * AFTER VERIFIED PAYMENT:
       *
       * 1. Save order to Firebase
       * 2. Clear cart
       * 3. Redirect to success page
       */

    } catch (error) {
      console.error(
        "Payment verification error:",
        error
      );

      setPaymentMessage(
        error.message ||
          "Payment was made but could not be verified."
      );

      alert(
        error.message ||
          "Payment was made but could not be verified."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  /* =========================================================
     PAYMENT CLOSED
  ========================================================= */

  const handlePaymentClose = () => {
    if (!isVerifying) {
      setPaymentMessage("Payment window closed.");
    }
  };

  /* =========================================================
     OPEN PAYSTACK
  ========================================================= */

  const handlePaystackPayment = () => {
    if (!email.trim()) {
      setPaymentMessage(
        "Please enter your email address."
      );
      return;
    }

    if (isVerifying) {
      return;
    }

    if (!publicKey) {
      setPaymentMessage(
        "Paystack public key is missing."
      );
      return;
    }

    if (amountInKobo <= 0) {
      setPaymentMessage(
        "Your cart total must be greater than ₦0."
      );
      return;
    }

    setPaymentMessage("");

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: publicKey,

      email: email.trim(),

      amount: amountInKobo,

      currency: "NGN",

      metadata: {
        customer_name: customerName.trim(),

        phone: phone.trim(),

        user_id: currentUser.uid,

        cart_items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },

      onSuccess: handlePaymentSuccess,

      onCancel: handlePaymentClose,
    });
  };

  /* =========================================================
     AUTH LOADING
  ========================================================= */

  if (authLoading) {
    return (
      <div className="checkout-auth-state">
        <div className="checkout-auth-icon">
          ...
        </div>

        <h2>
          Checking your account
        </h2>

        <p>
          Please wait while we check your
          sign-in status.
        </p>
      </div>
    );
  }

  /* =========================================================
     CUSTOMER MUST BE SIGNED IN
  ========================================================= */

  if (!currentUser) {
    return (
      <div className="checkout-auth-state">
        <div className="checkout-auth-icon">
          🔐
        </div>

        <h2>
          Sign in to continue
        </h2>

        <p>
          You need to sign in before you
          can complete your purchase.
        </p>

        <a
          href="/auth"
          className="checkout-signin-button"
        >
          SIGN IN TO CHECKOUT
        </a>
      </div>
    );
  }

  /* =========================================================
     PAYSTACK KEY CHECK
  ========================================================= */

  if (!publicKey) {
    return (
      <div className="payment-error">
        <strong>
          Paystack public key is missing.
        </strong>

        <br />

        Check your{" "}
        <code>
          VITE_PAYSTACK_PUBLIC_KEY
        </code>{" "}
        environment variable.

        <br />
        <br />

        Restart the Vite development server
        after changing your .env file.
      </div>
    );
  }

  /* =========================================================
     CART TOTAL CHECK
  ========================================================= */

  if (total <= 0) {
    return (
      <div className="payment-error">
        Your cart total must be greater than ₦0.
      </div>
    );
  }

  /* =========================================================
     CHECKOUT FORM
  ========================================================= */

  return (
    <div className="checkout-payment">

      {/* =====================================================
          CUSTOMER INFORMATION
      ====================================================== */}

      <div className="payment-customer-form">

        <div className="payment-section-label">
          CUSTOMER DETAILS
        </div>

        <h2>
          Your Information
        </h2>

        <p>
          Confirm your details before
          making your payment.
        </p>

        <div className="payment-field">

          <label htmlFor="customer-name">
            Full Name
          </label>

          <input
            id="customer-name"
            type="text"
            value={customerName}
            onChange={(event) =>
              setCustomerName(
                event.target.value
              )
            }
            placeholder="Enter your full name"
            autoComplete="name"
          />

        </div>

        <div className="payment-field">

          <label htmlFor="customer-email">
            Email Address
          </label>

          <input
            id="customer-email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

        </div>

        <div className="payment-field">

          <label htmlFor="customer-phone">
            Phone Number
          </label>

          <input
            id="customer-phone"
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(
                event.target.value
              )
            }
            placeholder="08012345678"
            autoComplete="tel"
          />

        </div>

        <div className="signed-in-notice">
          <span>✓</span>

          <p>
            You are signed in as{" "}
            <strong>
              {currentUser.email}
            </strong>
          </p>
        </div>

      </div>

      {/* =====================================================
          ORDER SUMMARY
      ====================================================== */}

      <div className="payment-summary">

        <div className="payment-section-label">
          PAYMENT
        </div>

        <h2>
          Order Summary
        </h2>

        <div className="payment-total-row">

          <span>
            Order Total
          </span>

          <strong>
            ₦{formattedTotal}
          </strong>

        </div>

        <div className="payment-security">

          <span className="security-icon">
            🔒
          </span>

          <div>
            <strong>
              Secure Payment
            </strong>

            <p>
              Your payment is securely
              processed by Paystack.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="paystack-button"
          onClick={handlePaystackPayment}
          disabled={
            !email.trim() ||
            isVerifying
          }
        >
          {isVerifying
            ? "VERIFYING PAYMENT..."
            : `PAY ₦${formattedTotal}`}
        </button>

        {paymentMessage && (
          <p className="payment-message">
            {paymentMessage}
          </p>
        )}

      </div>

    </div>
  );
};

export default CheckoutForm;
