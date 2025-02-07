(function () {
    "use strict";
  
    // List of defined languages
    const languages = [
      { code: "af", name: "Afrikaans", flag: "🇿🇦" },
      { code: "ar", name: "العربية", flag: "🇸🇦" },
      { code: "cs", name: "Čeština", flag: "🇨🇿" },
      { code: "nl", name: "Nederlands", flag: "🇳🇱" },
      { code: "en", name: "English", flag: "🇬🇧" },
      { code: "fi", name: "Suomi", flag: "🇫🇮" },
      { code: "fr", name: "Français", flag: "🇫🇷" },
      { code: "de", name: "Deutsch", flag: "🇩🇪" },
      { code: "hu", name: "Magyar", flag: "🇭🇺" },
      { code: "it", name: "Italiano", flag: "🇮🇹" },
      { code: "ja", name: "日本語", flag: "🇯🇵" },
      { code: "ko", name: "한국어", flag: "🇰🇷" },
      { code: "pl", name: "Polski", flag: "🇵🇱" },
      { code: "pt", name: "Português", flag: "🇵🇹" },
      { code: "ru", name: "Русский", flag: "🇷🇺" },
      { code: "es", name: "Español", flag: "🇪🇸" },
      { code: "sv", name: "Svenska", flag: "🇸🇪" },
      { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    ];
  
    let currentLang = "en";
  
    /** Helper functions for setting and reading cookies **/
    function setCookie(name, value) {
      document.cookie = `${name}=${value}; path=/; max-age=31536000`;
    }
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
  
    /** Updates the content of the language button **/
    function updateLanguageButton(lang) {
      const btn = document.getElementById("ml-languageButton");
      if (btn) {
        btn.innerHTML = `
          <span class="ml-flag notranslate">${lang.flag}</span>
          <span class="ml-language-name notranslate">${lang.name}</span>
        `;
      }
    }
  
    /** Shows the loading overlay **/
    function showLoading() {
      const loadEl = document.getElementById("ml-loadingOverlay");
      if (loadEl) loadEl.style.display = "flex";
    }
    /** Hides the loading overlay **/
    function hideLoading() {
      const loadEl = document.getElementById("ml-loadingOverlay");
      if (loadEl) loadEl.style.display = "none";
    }
  
    /** Performs Google Translate language change operation **/
    function changeLanguage(langCode) {
      const lang = languages.find((l) => l.code === langCode);
      if (lang) {
        try {
          const teCombo = document.querySelector(".goog-te-combo");
          if (teCombo) {
            teCombo.value = langCode;
            // Trigger change event
            teCombo.dispatchEvent(new Event("change", { bubbles: true }));
            currentLang = langCode;
            updateLanguageButton(lang);
            setCookie("preferred_language", langCode);
          }
        } catch (error) {
          console.error("Language change error:", error);
        }
        closePopup();
      }
    }
  
    /** Shows the popup **/
    function openPopup() {
      const overlay = document.getElementById("ml-overlay");
      const popup = document.getElementById("ml-languagePopup");
      if (overlay && popup) {
        overlay.style.display = "block";
        popup.style.display = "block";
      }
    }
  
    /** Closes the popup **/
    function closePopup() {
      const overlay = document.getElementById("ml-overlay");
      const popup = document.getElementById("ml-languagePopup");
      if (overlay && popup) {
        overlay.style.display = "none";
        popup.style.display = "none";
      }
    }
  
    /** Callback function to be called when Google Translate API is loaded **/
    function googleTranslateElementInit() {
      const savedLang = getCookie("preferred_language");
  
      // If there's a saved language and it's not English, show loading screen
      if (savedLang && savedLang !== "en") {
        showLoading();
        setTimeout(hideLoading, 2000);
      }
  
      new google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((l) => l.code).join(","),
          layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,
          autoDisplay: false,
        },
        "google_translate_element"
      );
  
      if (savedLang && savedLang !== "en") {
        // Change language with a short delay
        setTimeout(() => {
          changeLanguage(savedLang);
        }, 500);
      } else {
        // Browser language check
        const browserLang = (navigator.language || navigator.userLanguage)
          .split("-")[0];
        if (languages.some((l) => l.code === browserLang) && browserLang !== "en") {
          changeLanguage(browserLang);
        }
      }
    }
    // Google Translate callback function needs to be accessible in global scope
    window.googleTranslateElementInit = googleTranslateElementInit;
  
    /** Function that adds required DOM elements and style definitions for the widget **/
    function initWidget() {
      // 1. Add style definitions
      const style = document.createElement("style");
      style.innerHTML = `
        /* Multi-Language Widget CSS (ml- prefixed) */
        .ml-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }
        .ml-language-popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 12px;
            width: auto;
            max-width: 400px;
            height: auto;
            max-height: 80vh;
            overflow-y: auto;
            z-index: 1001;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        .ml-language-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        .ml-language-option {
            display: flex;
            align-items: center;
            padding: 14px;
            cursor: pointer;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #fff;
            transition: all 0.2s ease;
        }
        .ml-language-option:hover {
            background: #f5f5f5;
            border-color: #999;
        }
        .ml-language-option .ml-flag {
            font-size: 24px !important;
            margin-right: 15px;
            display: inline-block;
            min-width: 24px;
        }
        .ml-language-option .ml-language-name {
            font-size: 16px !important;
            font-weight: 500;
            color: #333;
        }
        #ml-languageButton {
            font-size: 16px !important;
            padding: 8px 16px;
            background: white;
            color: #333;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        #ml-languageButton:hover {
            background: #f5f5f5;
        }
        .ml-loading-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            z-index: 9999;
            justify-content: center;
            align-items: center;
        }
        .ml-loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            animation: ml-spin 1s linear infinite;
        }
        @keyframes ml-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        /* Hide Google Translate elements */
        .goog-te-banner-frame,
        .goog-te-gadget-simple,
        .goog-te-gadget span,
        .goog-te-menu-value span,
        .goog-te-gadget-icon,
        .goog-te-banner,
        .skiptranslate,
        .goog-logo-link,
        .VIpgJd-ZVi9od-l4eHX-hSRGPd,
        .goog-te-gadget {
            display: none !important;
        }
        body {
            top: 0 !important;
        }
        @media (max-width: 768px) {
            .ml-language-grid {
                grid-template-columns: 1fr !important;
                gap: 10px;
            }
            .ml-language-popup {
                padding: 15px;
                width: 95%;
            }
            .ml-language-option {
                padding: 15px;
            }
        }
      `;
      document.head.appendChild(style);
  
      // 2. Create and add required DOM elements to body
  
      // a) Overlay (background dimming)
      const overlay = document.createElement("div");
      overlay.id = "ml-overlay";
      overlay.className = "ml-overlay";
      overlay.addEventListener("click", closePopup);
      document.body.appendChild(overlay);
  
      // b) Popup and language options grid inside
      const popup = document.createElement("div");
      popup.id = "ml-languagePopup";
      popup.className = "ml-language-popup";
      const grid = document.createElement("div");
      grid.id = "ml-languageGrid";
      grid.className = "ml-language-grid";
      // Create an option for each language
      languages.forEach((lang) => {
        const option = document.createElement("div");
        option.className = "ml-language-option";
        option.innerHTML = `
            <span class="ml-flag notranslate">${lang.flag}</span>
            <span class="ml-language-name notranslate">${lang.name}</span>
        `;
        option.addEventListener("click", function () {
          changeLanguage(lang.code);
        });
        grid.appendChild(option);
      });
      popup.appendChild(grid);
      document.body.appendChild(popup);
  
      // c) Loading overlay (spinner)
      const loadingOverlay = document.createElement("div");
      loadingOverlay.id = "ml-loadingOverlay";
      loadingOverlay.className = "ml-loading-overlay";
      const spinner = document.createElement("div");
      spinner.className = "ml-loading-spinner";
      loadingOverlay.appendChild(spinner);
      document.body.appendChild(loadingOverlay);
  
      // d) Hidden container for Google Translate
      if (!document.getElementById("google_translate_element")) {
        const gtElem = document.createElement("div");
        gtElem.id = "google_translate_element";
        document.body.appendChild(gtElem);
      }
  
      // 3. Create button to show language selection
      const langButton = document.createElement("button");
      langButton.id = "ml-languageButton";
      // Default language: English
      langButton.innerHTML = `
        <span class="ml-flag notranslate">🇬🇧</span>
        <span class="ml-language-name notranslate">English</span>
      `;
      langButton.addEventListener("click", openPopup);
  
      // 4. Check where to place the button:
      // If developer added <div id="ml-lang-selector"></div> on page, add there, otherwise add to body
      const placeholder = document.getElementById("multilang");
      if (placeholder) {
        placeholder.appendChild(langButton);
      } else {
        document.body.appendChild(langButton);
      }
    }
  
    /** Dynamically adds Google Translate API script **/
    function loadGoogleTranslateScript() {
      const gtScript = document.createElement("script");
      gtScript.type = "text/javascript";
      gtScript.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(gtScript);
    }
  
    /** Run initWidget function immediately if DOM is ready, otherwise run on DOMContentLoaded **/
    function run() {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
          initWidget();
          loadGoogleTranslateScript();
        });
      } else {
        initWidget();
        loadGoogleTranslateScript();
      }
    }
  
    run();
  })();
