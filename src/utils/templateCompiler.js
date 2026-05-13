import fs from 'fs';
import Handlebars from 'handlebars';

export function renderTemplate(templatePath,context){
const templateSource = fs.readFileSync(templatePath, 'utf-8');
const template = Handlebars.compile(templateSource);

return template(context);
}