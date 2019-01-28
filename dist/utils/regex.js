"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromHtml(html) {
    var content = html.match(/<a\s.*?href=\'([^\"]+)\'[^>]*>(.*?)<\/a>/);
    return { name: content[2], url: content[1] };
}
exports.fromHtml = fromHtml;
