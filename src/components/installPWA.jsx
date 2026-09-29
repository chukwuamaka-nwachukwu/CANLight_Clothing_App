
import { useEffect, useState } from "react";
import "./installPWA.scss";

const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check whether CANLight is already installed
    const checkIfInstalled = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      setIsInstalled(standalone);
    };

    checkIfInstalled();

    // Chrome/Edge fires this when the PWA is installable
    const handleBeforeInstallPrompt = (event) => {
      console.log("✅ CANLight is ready to install.");

      // Stop the browser from automatically showing its own prompt
      event.preventDefault();

      // Save the event so our button can trigger it
      setInstallPrompt(event);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    // Fires after successful installation
    const handleAppInstalled = () => {
      console.log("✅ CANLight installed successfully.");

      setInstallPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener(
      "appinstalled",
      handleAppInstalled
    );

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

  const handleInstallClick = async () => {
    // Native browser installation prompt is available
    if (installPrompt) {
      try {
        console.log("📱 Opening CANLight installation prompt...");

        // Immediately open the browser's install dialog
        await installPrompt.prompt();

        // Wait for the user's decision
        const { outcome } = await installPrompt.userChoice;

        console.log(
          "CANLight installation result:",
          outcome
        );

        // The prompt can only be used once
        setInstallPrompt(null);

        if (outcome === "accepted") {
          console.log("🎉 CANLight installation accepted.");
        } else {
          console.log("CANLight installation cancelled.");
        }
      } catch (error) {
        console.error(
          "❌ CANLight installation error:",
          error
        );
      }

      return;
    }

    // If the browser hasn't supplied the native prompt yet
    alert(
      "CANLight is not ready for automatic installation yet.\n\n" +
        "Please open the browser menu and choose " +
        "'Install CANLight Clothing'."
    );
  };

  // Don't show the button after installation
  if (isInstalled) {
    return null;
  }

  return (
    <button
      type="button"
      className="install-pwa-button"
      onClick={handleInstallClick}
      aria-label="Install CANLight Clothing"
    >
      📱 Install CANLight<br />Clothing
    </button>
  );
};

export default InstallPWA;
