# SQRBOK - Software Quality and Reliability Body of Knowledge

A comprehensive course handbook and knowledge repository for **Software Quality and Reliability**, covering key topics in software quality assurance, verification and validation, testing, and reliability engineering.

**Live Site:** [sqrbok.github.io](https://sqrbok.github.io)

## About

This repository contains structured course notes and resources designed for students, professionals, and anyone interested in learning about software quality and reliability. The content focuses on breadth over depth, introducing a wide range of concepts and practices while emphasizing critical thinking and decision-making.

## Content Areas

The handbook is organized into major knowledge areas:

1. **[Defining Quality](content/define/)** - Quality views, models, metrics, and measurement
2. **[Organizing Quality](content/organization/)** - Quality management, costs, processes, and organizational strategies
3. **[Verification and Validation](content/verif/)** - Testing techniques, coverage criteria, and static analysis
4. **[Quality Attributes](content/attributes/)** - Maintainability, reliability, security, and usability
5. **[Materials](content/material/)** - Curated resources, books, and research papers
6. **[Templates](templates/)** - Contribution templates and guidelines

## Technology Stack

- **Jekyll** (v4.4.1) - Static site generator
- **Just the Docs** - Documentation theme
- **jekyll-scholar** - Bibliography and citation management (IEEE style)
- **GitHub Pages** - Hosting and deployment

## Building Locally

### Prerequisites

- Ruby 3.3 or higher
- Bundler

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sqrbok/sqrbok.github.io.git
   cd sqrbok.github.io
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Build and serve locally:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser to `http://localhost:4000`

## Project Structure

```
.
├── content/           # Main course content organized by topic
│   ├── define/       # Defining quality
│   ├── organization/ # Organizing quality
│   ├── verif/        # Verification and validation
│   ├── attributes/   # Quality attributes
│   ├── material/     # Curated resources
│   └── template/     # Contribution templates
├── _includes/        # Reusable Jekyll components
├── _layouts/         # Page layout templates
├── _sass/            # Stylesheets and color schemes
├── _bibliography/    # Bibliography files for citations
└── images/           # Static assets
```

## Contributing

Contributions are welcome! We accept:
- **Content fixes**: typos, fact checks, source validation, clarifications
- **Method descriptions**: 1-2 page focused technique descriptions
- **Comparative analyses**: 3-4 page papers comparing different approaches

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines and templates.

**Quick start:**
- Use [templates/method-template.md](templates/method-template.md) for new methods
- Use [templates/analysis-template.md](templates/analysis-template.md) for comparative papers
- Follow the atomic page principle - each page is self-contained
- Include proper citations and sources

## Deployment

The site is automatically built and deployed to GitHub Pages via GitHub Actions whenever changes are pushed to the `main` branch.

## License

This work is licensed under the [Creative Commons Attribution 4.0 International License (CC BY 4.0)](LICENSE).

You are free to share and adapt the material for any purpose, even commercially, as long as you give appropriate credit.

## Author

**Andrey Sadovykh**

## Acknowledgments

This handbook draws from various sources in software quality and reliability engineering. Pages with significant content from specific sources include an **Acknowledgments section** crediting the original authors, along with proper citations in the **Sources section**.

## Attribution and Citations

This project maintains rigorous attribution practices:

- **All content pages** include a Sources section with full citations
- **Source-based materials** have dedicated Acknowledgments sections
- **Academic citations** follow IEEE style via jekyll-scholar
- **Original frameworks and methods** are attributed to their creators

## Disclaimer

AI tools were used for text polishing and improving explanations. All facts and claims have been verified by the authors.

In case of an error, feel free to [file an issue](https://github.com/sqrbok/sqrbok.github.io/issues).
