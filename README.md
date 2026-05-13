# spring-feature-cli

`spring-feature-cli` is a Node.js CLI tool that generates Spring Boot feature-based boilerplate using templates.

It helps automate the creation of common backend layers such as entities, services, repositories, and controllers following a clean and consistent structure.

---

## Purpose

This project was built to:

- Practice building real-world CLI tools with Node.js
- Learn `commander`, `inquirer`, and `handlebars`
- Automate repetitive Spring Boot boilerplate generation
- Apply feature-based architecture patterns

---

## ⚙️ Installation

### Global installation (recommended)

```bash
npm install -g spring-feature-cli
```

### Local usage (development)
```bash
npm install
npm run dev
```

## Usage

### Generate a Spring Boot feature:

```bash
spfc generate User
```

or

```bash
spfc g User 
```
This will generate a full structure for the feature (Entity, Repository, Service, Controller).

### 🧱 Generated Structure

The CLI generates:

- Entity  
- Repository  
- Service  
- Controller  

All based on Handlebars templates and a consistent naming convention.

## 📁 Project Structure

- `bin/index.js` → CLI entry point  
- `src/index.js` → Main CLI logic  
- `src/commands/` → Command definitions  
- `src/actions/` → Generation logic  
- `src/validations/` → Input validation layer  
- `src/utils/` → Helpers (logging, scanning, template compilation, etc.)  
- `src/templates/` → Handlebars templates for generated code  

---

## 🧰 Key Dependencies

- `commander` → CLI command handling  
- `inquirer` → Interactive prompts  
- `handlebars` → Template engine  
- `chalk` → Terminal styling  

---

## ⚠️ Requirements

- Node.js >= 16  

---

## 💡 Notes

This tool assumes a Spring Boot project structure and is intended to be used inside a backend project where Java packages are detected automatically.

📄 License

MIT