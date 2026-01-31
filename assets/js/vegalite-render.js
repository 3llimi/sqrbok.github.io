(function() {
  function decodeHtmlEntities(text) {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

  function renderVegaLiteCharts() {
    var vegaBlocks = [];

    // Find by wrapper div class (Jekyll/Rouge style)
    document.querySelectorAll('.language-vega-lite, .language-vegalite').forEach(function(wrapper) {
      var code = wrapper.querySelector('code');
      if (code) vegaBlocks.push({ code: code, wrapper: wrapper });
    });

    // Find by code element class
    document.querySelectorAll('code.language-vega-lite, code.language-vegalite').forEach(function(code) {
      var alreadyAdded = vegaBlocks.some(function(b) { return b.code === code; });
      if (!alreadyAdded) {
        var wrapper = code.closest('.highlighter-rouge') || code.closest('.highlight') || code.parentElement;
        vegaBlocks.push({ code: code, wrapper: wrapper });
      }
    });

    // Find by highlighter-rouge class containing vega
    document.querySelectorAll('[class*="highlighter-rouge"][class*="vega"]').forEach(function(wrapper) {
      var code = wrapper.querySelector('code');
      if (code) {
        var alreadyAdded = vegaBlocks.some(function(b) { return b.code === code; });
        if (!alreadyAdded) vegaBlocks.push({ code: code, wrapper: wrapper });
      }
    });

    // Fallback: find code blocks with Vega-Lite content
    if (vegaBlocks.length === 0) {
      document.querySelectorAll('pre code').forEach(function(code) {
        var text = decodeHtmlEntities(code.textContent).trim();
        if (text.charAt(0) === '{' && text.indexOf('vega') > -1 && text.indexOf('$schema') > -1) {
          try {
            var parsed = JSON.parse(text);
            if (parsed.$schema && parsed.$schema.indexOf('vega') > -1) {
              var wrapper = code.closest('.highlighter-rouge') || code.closest('.highlight') || code.parentElement;
              vegaBlocks.push({ code: code, wrapper: wrapper });
            }
          } catch (e) { /* skip */ }
        }
      });
    }

    console.log('Vega-Lite: Found ' + vegaBlocks.length + ' chart(s)');

    vegaBlocks.forEach(function(block, index) {
      var specText = decodeHtmlEntities(block.code.textContent).trim();
      var spec;

      try {
        spec = JSON.parse(specText);
      } catch (e) {
        console.error('Vega-Lite parse error:', e.message, specText.substring(0, 100));
        return;
      }

      var container = document.createElement('div');
      container.id = 'vega-chart-' + index;
      container.className = 'vega-chart-container';
      block.wrapper.parentNode.insertBefore(container, block.wrapper);
      block.wrapper.style.display = 'none';

      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      vegaEmbed('#' + container.id, spec, {
        theme: isDark ? 'dark' : undefined,
        actions: { export: true, source: false, compiled: false, editor: true }
      }).then(function() {
        console.log('Vega-Lite: Chart ' + index + ' rendered');
      }).catch(function(err) {
        console.error('Vega-Lite render error:', err);
        block.wrapper.style.display = 'block';
        container.innerHTML = '<p style="color:red;padding:1rem;background:#fee;">Chart error: ' + err.message + '</p>';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderVegaLiteCharts);
  } else {
    renderVegaLiteCharts();
  }
})();
