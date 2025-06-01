"use client"
import React, { useEffect } from "react";

const LiveChat = () => {
  useEffect(() => {
    // Initialize the LiveChat configuration
    window.__lc = window.__lc || {};
    window.__lc.license = 18835254; // Your LiveChat License ID
    window.__lc.integration_name = "manual_channels";
    window.__lc.product_name = "livechat";

    // Dynamically load the LiveChat script
    (function (n, t, c) {
      function i(n) {
        return e._h ? e._h.apply(null, n) : e._q.push(n);
      }
      var e = {
        _q: [],
        _h: null,
        _v: "2.0",
        on: function () {
          i(["on", c.call(arguments)]);
        },
        once: function () {
          i(["once", c.call(arguments)]);
        },
        off: function () {
          i(["off", c.call(arguments)]);
        },
        get: function () {
          if (!e._h)
            throw new Error("[LiveChatWidget] You can't use getters before load.");
          return i(["get", c.call(arguments)]);
        },
        call: function () {
          i(["call", c.call(arguments)]);
        },
        init: function () {
          var n = t.createElement("script");
          n.async = true;
          n.type = "text/javascript";
          n.src = "https://cdn.livechatinc.com/tracking.js";
          t.head.appendChild(n);
        },
      };
      !n.__lc.asyncInit && e.init(), (n.LiveChatWidget = n.LiveChatWidget || e);
    })(window, document, [].slice);

    return () => {
      // Cleanup script when component unmounts
      const liveChatScript = document.querySelector(
        'script[src="https://cdn.livechatinc.com/tracking.js"]'
      );
      if (liveChatScript) {
        liveChatScript.remove();
      }
      window.__lc = undefined;
      window.LiveChatWidget = undefined;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default LiveChat;
