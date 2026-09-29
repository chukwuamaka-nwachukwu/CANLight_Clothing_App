import { useEffect, useState } from "react";
import "./installPWA.scss";

const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    console.log("========================================");
    console.log("CANLight PWA INSTALLATION CHECK");
    console.log("========================================");

    /* =====================================================
       HTTPS
    ===================================================== */

    console.log(
      "HTTPS:",
      window.location.protocol === "https:"
    );

    console.log(
      "Current URL:",
      window.location.href
    );

    /* =====================================================
       SERVICE WORKER
    ===================================================== */

    console.log(
      "Service Worker supported:",
      "serviceWorker" in navigator
    );

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          console.log(
            "Service Worker registrations:",
            registrations
          );

          if (registrations.length === 0) {
            console.warn(
              "⚠️ No service worker is registered yet."
            );
          } else {
            console.log(
              "✅ Service worker found."
            );

            registrations.forEach((registration) => {
              console.log(
                "Service Worker scope:",
                registration.scope
              );

              console.log(
                "Service Worker active:",
                registration.active
              );

              console.log(
                "Service Worker installing:",
                registration.installing
              );

              console.log(
                "Service Worker waiting:",
                registration.waiting
              );
            });
          }
        })
        .catch((error) => {
          console.error(
            "❌ Could not check service worker:",
            error
          );
        });
    }

    /* =====================================================
       MANIFEST
    ===================================================== */

    const manifest = document.querySelector(
      'link[rel="manifest"]'
    );

    console.log(
      "Manifest link:",
      manifest
    );

    if (manifest) {
      console.log(
        "Manifest URL:",
        manifest.href
      );
    } else {
      console.error(
        "❌ NO MANIFEST LINK FOUND."
      );
    }

    /* =====================================================
       INSTALLED STATE
    ===================================================== */

    const checkIfInstalled = () => {
      const standalone =
        window.matchMedia(
          "(display-mode: standalone)"
        ).matches ||
        window.navigator.standalone === true;

      console.log(
        "Running as installed app:",
        standalone
      );

      setIsInstalled(standalone);
    };

    checkIfInstalled();

    /* =====================================================
       BEFORE INSTALL PROMPT
    ===================================================== */

    const handleBeforeInstallPrompt = (event) => {
      console.log(
        "========================================"
      );

      console.log(
        "🎉 beforeinstallprompt FIRED!"
      );

      console.log(
        "========================================"
      );

      event.preventDefault();

      setInstallPrompt(event);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    /* =====================================================
       APP INSTALLED
    ===================================================== */

    const handleAppInstalled = () => {
      console.log(
        "========================================"
      );

      console.log(
        "🎉 CANLight Clothing was installed!"
      );

      console.log(
        "========================================"
      );

      setInstallPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );

      window.removeEventListener(
        "appinstalled",
        handleAppInstalled
      );
    };
  }, []);

  /* =====================================================
     INSTALL
  ===================================================== */

  const handleInstallClick = async () => {
    console.log(
      "Install button clicked."
    );

    console.log(
      "Saved install prompt:",
      installPrompt
    );

    if (!installPrompt) {
      alert(
        "Chrome has not made CANLight Clothing available for automatic installation yet.\n\n" +
          "Make sure you are using HTTPS and that the PWA requirements have been met."
      );

      return;
    }

    try {
      console.log(
        "Opening native CANLight Clothing installation dialog..."
      );

      await installPrompt.prompt();

      const { outcome } =
        await installPrompt.userChoice;

      console.log(
        "Installation result:",
        outcome
      );

      setInstallPrompt(null);
    } catch (error) {
      console.error(
        "Installation error:",
        error
      );
    }
  };

  /* =====================================================
     HIDE WHEN INSTALLED
  ===================================================== */

  if (isInstalled) {
    return null;
  }

  /* =====================================================
     INSTALL BUTTON
  ===================================================== */

  return (
    <button
      type="button"
      className="install-pwa-button"
      onClick={handleInstallClick}
      aria-label="Install CANLight Clothing"
    >
      📱 Install CANLight
      <br />
      Clothing
    </button>
  );
};

export default InstallPWA;