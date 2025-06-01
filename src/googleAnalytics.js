// import ReactGA from 'react-ga4';

// const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// export const initGA = () => {
//   ReactGA.initialize("G-MFKZYXNFFG");
// };

// export const logPageView = (path) => {
//   ReactGA.send({ hitType: 'pageview', page: path });
// };

// export const logEvent = (category, action, label) => {
//   ReactGA.event({
//     category,
//     action,
//     label,
//   });
// };
export const GA_TRACKING_ID = "G-1B6D6BKY0C"; // Replace with your GA ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Log page views
export const logPageView = (url) => {
  if (typeof window !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};
