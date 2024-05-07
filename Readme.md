## Contributing Themes

To contribute a new theme, follow these steps:

1. **Create a new theme in `dist/styles.css`**: Define your theme using CSS variables. Each theme should be a class with the name of the theme.

2. **Add theme logic in `test-theme.ts`**: Update the theme selection logic to include your new theme. This is done by adding a new `if` statement in the `DOMContentLoaded` event listener.

Here's the existing code:

```javascript
window.addEventListener("DOMContentLoaded", function () {
  const body: HTMLElement | null = document.querySelector("body");
  let currentTheme: string | null = localStorage.getItem("theme");

  if (currentTheme === "matrix-theme") {
    body?.classList.add("matrix-theme");
  } else if (currentTheme === "pink-theme") {
    body?.classList.add("pink-theme");
  } else {
    // If currentTheme is "default-theme" or null/undefined, set to "default-theme"
    localStorage.setItem("theme", "default-theme");
    body?.classList.add("default-theme");
  }
});
```

### Learned about error propogation