// import '../styles/globals.css'
// import '../app/globals.css'
// import '../public/assets/css/style.css'
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useApollo } from "../app/hook";
import RootLayout from "../app/layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    const mobileAppDeepLink = `factory:/${router.asPath}`;

    if (isMobile) {
      // Check if the app is installed or not
      window.location.href = mobileAppDeepLink;

      // Add a timeout to give some time for the app to open
      setTimeout(() => {
        // If the user is still on the webpage, the app is not installed
        if (isIOS) {
          // Redirect to the App Store for iOS
          window.location.href =
            "https://apps.apple.com/pk/app/factory-universe/id1601798637";
        } else if (isAndroid) {
          // Redirect to Google Play Store for Android
          window.location.href =
            "https://play.google.com/store/apps/details?id=com.factoryuniverse";
        }
      }, 2000); // Adjust the timeout as needed
    }
  }, [router.asPath]);
  console.log(router.asPath, "router.asPath");
  return (
    <ApolloProvider client={apolloClient}>
      <RootLayout>
        <Component {...pageProps} />
        <ToastContainer />
      </RootLayout>
    </ApolloProvider>
  );
}

export default MyApp;
