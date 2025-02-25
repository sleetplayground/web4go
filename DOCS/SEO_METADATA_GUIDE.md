# SEO and Metadata Guide for WEB4GO

This guide outlines the essential SEO and metadata implementation for the WEB4GO browser project to optimize visibility and improve search engine rankings for web4 and NEAR blockchain related searches.

## Core Meta Tags

Implement these basic meta tags in the `<head>` section of your HTML:

```html
<!-- Essential Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="WEB4GO - Your gateway to Web4 content on NEAR blockchain. Browse and discover decentralized web applications across master accounts and subaccounts.">
<meta name="keywords" content="web4, NEAR blockchain, IPFS, decentralized web, web4 browser, NEAR protocol, blockchain apps, dapps, web3">
<meta name="author" content="sleet.near">

<!-- Robots Meta Tag -->
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">

<!-- Language and Region -->
<meta name="language" content="English">

<!-- Theme Color for Browser -->
<meta name="theme-color" content="#000000">
```

## Open Graph Protocol Tags

Add these tags to improve social media sharing appearance:

```html
<!-- Open Graph Meta Tags -->
<meta property="og:title" content="WEB4GO - Web4 Browser for NEAR Blockchain">
<meta property="og:description" content="Browse and discover Web4 content across NEAR blockchain master accounts and subaccounts. Your gateway to the decentralized web.">
<meta property="og:image" content="https://yourdomain.com/web_icon.png">
<meta property="og:url" content="https://yourdomain.com">
<meta property="og:type" content="website">
<meta property="og:site_name" content="WEB4GO">
```

## Twitter Card Metadata

Optimize appearance when shared on Twitter:

```html
<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="WEB4GO - Web4 Browser for NEAR Blockchain">
<meta name="twitter:description" content="Browse and discover Web4 content across NEAR blockchain master accounts and subaccounts. Your gateway to the decentralized web.">
<meta name="twitter:image" content="https://yourdomain.com/web_icon.png">
```

## Additional SEO Optimizations

### 1. Canonical URL
Prevent duplicate content issues:
```html
<link rel="canonical" href="https://yourdomain.com">
```

### 2. Favicon
Ensure proper favicon implementation:
```html
<link rel="icon" type="image/svg+xml" href="/web_icon.svg">
<link rel="apple-touch-icon" href="/web_icon.png">
```

### 3. Manifest File
Add a web app manifest for better mobile experience:
```html
<link rel="manifest" href="/manifest.json">
```

## Best Practices

1. **Keep Descriptions Concise**
   - Meta descriptions should be between 150-160 characters
   - Titles should be 50-60 characters

2. **Use Relevant Keywords**
   - Focus on Web4, NEAR blockchain, and decentralized web terms
   - Include both technical and user-friendly terms

3. **Regular Updates**
   - Update meta descriptions when adding new features
   - Keep social media cards current

4. **Mobile Optimization**
   - Ensure viewport meta tag is properly set
   - Test appearance on various devices

5. **Performance**
   - Optimize image sizes for social media cards
   - Use appropriate image formats (SVG for icons, WebP for photos)

## Implementation

Add these tags to your `index.html` file in the proper order within the `<head>` section. Ensure all URLs are absolute and point to your actual domain.

## Monitoring

1. Use Google Search Console to monitor indexing
2. Test social media card appearance using:
   - Twitter Card Validator
   - Facebook Sharing Debugger
   - LinkedIn Post Inspector

## Regular Maintenance

- Review and update meta descriptions quarterly
- Check for broken image links
- Update content to reflect new features and changes
- Monitor search performance and adjust keywords as needed

---

Note: Replace `https://yourdomain.com` with your actual domain when implementing these tags.