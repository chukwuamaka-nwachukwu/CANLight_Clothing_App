import { useEffect, useState } from "react";
import "./installPWA.scss";

const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    console.log("=================================");
    console.log("CANLight PWA");
    console.log("=================================");

    // Check whether CANLight is already installed
    const checkIfInstalled = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      console.log(
        "CANLight running as installed app:",
        standalone
      );

      setIsInstalled(standalone);
    };

    checkIfInstalled();

    // Browser provides the native installation prompt
    const handleBeforeInstallPrompt = (event) => {
      console.log("✅ CANLight beforeinstallprompt FIRED");

      // Stop Chrome from automatically displaying its prompt
      event.preventDefault();

      // Save the event for our button
      setInstallPrompt(event);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    // App successfully installed
    const handleAppInstalled = () => {
      console.log("✅ CANLight successfully installed.");

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
    /*
     * If Chrome has provided the native PWA prompt,
     * open it.
     */
    if (installPrompt) {
      try {
        console.log(
          "Opening CANLight installation prompt..."
        );

        await installPrompt.prompt();

        const { outcome } =
          await installPrompt.userChoice;

        console.log(
          "CANLight installation result:",
          outcome
        );

        setInstallPrompt(null);
      } catch (error) {
        console.error(
          "CANLight installation error:",
          error
        );
      }

      return;
    }

    /*
     * If Chrome has NOT provided beforeinstallprompt,
     * tell the user how to install manually.
     */
    alert(
      "CANLight can be installed from your browser menu. " +
        "On Chrome, click the Install icon in the address bar " +
        "or open the browser menu and choose 'Install CANLight Clothing'."
    );
  };

  /*
   * If already installed, don't show the button.
   */
  if (isInstalled) {
    return null;
  }

  /*
   * ALWAYS SHOW THE BUTTON WHEN RUNNING IN THE BROWSER.
   */
  return (
    <button
      type="button"
      className="install-pwa-button"
      onClick={handleInstallClick}
      aria-label="Install CANLight Clothing"
    >
      📱 Install CANLight<br/>Clothing
      
    </button>
  );
};

export default InstallPWA;