# Multi-Language Widget

Multi-Language Widget is a lightweight JavaScript tool that lets you add multilingual support to your website with just one line of code. Using the Google Translate API, it automatically translates your page content based on user selection and saves their preference using cookies.

## Features

- **Easy Integration:** Add a placeholder `<div>` and include the widget script to get started.
- **Google Translate Support:** Automatically translate your site's content using the Google Translate API.
- **Persistent Language Preferences:** User's language choices are stored in a cookie for future visits.
- **Customizable:** Modify the language list and styling to suit your website's needs.
- **Responsive Design:** Fully functional on both desktop and mobile devices.

## Installation

You can include the widget in your project in two ways:

1. **Via CDN:**
```html
<script src="https://unpkg.com/google-translate-pure-js/js/multilang.js"></script>
```

2. **Download or Clone the Repository**

   Place the `multilang.js` file in your project (for example, in a `js` folder).

3. **Include the Widget in Your HTML**

   Add a placeholder element where you want the language selector button to appear, and then include the script:

   ```html
   <!-- Placeholder for the language selector (position it wherever you like) -->
   <div id="multilang"></div>

   <!-- Include the widget script -->
   <script src="js/multilang.js"></script>
   ```

   If you do not provide a placeholder with the ID `multilang`, the widget will automatically append the language button to the `<body>`.

## Usage

When the page loads, the widget does the following:

- Dynamically injects required CSS and DOM elements (including an overlay, language selection popup, loading spinner, and a container for the Google Translate element).
- Loads the Google Translate API script.
- Displays a language selection button that opens a popup with available languages.
- Changes the site's language based on user selection and stores the choice in a cookie for future visits.

## Example HTML

Below is an example of a basic HTML page using the widget:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://unpkg.com/google-translate-pure-js@latest/js/multilang.js"></script>  
  <title>Multi-Language Example</title>
</head>
<body>
  <center>
    <h1>Multi-Language Widget Demo</h1>
    <p>This text will be translated</p>
    <p class="notranslate">This text will NOT be translated</p>
    <p>Product name: <span class="notranslate">HomeHome.App Bridge</span></p>

    <!-- Widget Placeholder -->
    <div id="multilang"></div>

    <br><br>
    <a href="https://www.buymeacoffee.com/1979" target="_blank">
      <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;">
    </a>
  </center>
  <script>
    // Initialize with custom languages
    initMultiLang({
      pageLanguage: "en",
      languages: [
        { code: "en", name: "English", flag: "🇬🇧" },
        { code: "es", name: "Español", flag: "🇪🇸" },
        { code: "fr", name: "Français", flag: "🇫🇷" },
        { code: "tr", name: "Türkçe", flag: "🇹🇷" }
      ]
    });

    // ➡️ Or use default configuration:
    // initMultiLang();

    /*
    initMultiLang defaults: 
    Page lang:en and default languages:
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
    */

  </script>
</body>
</html>
```

## Customization

- **Styling:** The widget's CSS is injected via a `<style>` block within `multilang.js`. You can edit this block to change the appearance.
- **Language List:** Modify the `languages` array in `multilang.js` to add or remove language options.
- **Placeholder:** The widget looks for an element with the ID `multilang` to insert the language button. Change or add your own placeholder as needed.

## Configuration

You can customize the widget by passing configuration options when initializing:

## Support & Donations

If you find this project useful, please consider supporting its development.  
[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=1979&button_colour=FFDD00&font_colour=000000&font_family=Cookie)](https://www.buymeacoffee.com/1979)

## Contributing

Contributions are welcome! Whether you find a bug, want to suggest new features, or improve the code, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

### How to Use

1. **Clone or Download the Repository:**  
   Place the `multilang.js` file into your project.

2. **Add a Placeholder Element:**  
   Insert a `<div id="multilang"></div>` where you want the language selector button to appear.

3. **Include the Script:**  
   Add the following line to your HTML file:
   ```html
   <script src="js/multilang.js"></script>
   ```

**Customize:**  
Feel free to modify the styling or the language list directly in `multilang.js` as needed.

**Support:**  
If you enjoy using this widget, consider supporting the project via Buy Me a Coffee.

<a href="https://www.buymeacoffee.com/1979" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>