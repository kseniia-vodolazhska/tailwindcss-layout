import { ComponentMetadata } from '../models/component-metadata.model';
import * as Mustache from 'mustache';

export class TemplateMetadataToHtmlTranspiler {
  convert(componentsMetadata: ComponentMetadata[]): string {
    const rowsMap = new Map<number, ComponentMetadata[]>();
    let maxColumns = 1;

    componentsMetadata.forEach((c, idx) => {
      if (c.column > maxColumns) {
        maxColumns = c.column;
      }
      if (rowsMap.has(c.row)) {
        let row = rowsMap.get(c.row);
        row!.push(c);
        row = row!.sort(({column: a}, {column: b}) => a - b);
        rowsMap.set(c.row, row!);
      } else {
        const row = [c];
        rowsMap.set(c.row, row);
      }
    });

    const result = Array.from(rowsMap.entries()).sort((a, b) => a[0] - b[0]).map(r => {
      const columnsMap = new Map<number, ComponentMetadata[]>();
      r[1].forEach(c => {
        if (columnsMap.has(c.column)) {
          let columns = columnsMap.get(c.column);
          columns!.push(c);
          columns = columns!.sort((a, b) => a!.configuration!.orderId! - b!.configuration!.orderId!);
          columnsMap.set(c.column, columns!);
        } else {
          const columns = [c];
          columnsMap.set(c.column, columns);
        }
      });

      return {
        row: r[0],
        columns: Array.from(columnsMap.entries()).sort((a, b) => a[0] - b[0]).map(c => {
          const maxElementsNumber = Math.max(...Array.from(columnsMap.entries()).map(c => c[1].length));
          const hasMultiElementsColumn = c[1].length < maxElementsNumber;
          const rowspanCssClass = hasMultiElementsColumn ? 'class="row-span-' + maxElementsNumber + '"' : "";

          return {
            column: c[0],
            elementsCount: c[1].length,
            elements: (<any>Mustache).default
              .render(`<div ${rowspanCssClass} ${Array.from(columnsMap.keys()).length < maxColumns ? 'class="col-span-' + maxColumns + '"' : ""}>{{&.}}</div>`,
                c[1].map(e => (`<${e.name} ${hasMultiElementsColumn ? 'class="h-full grid"' : ""}></${e.name}>`)).join(""))
          }
        })
      }
    });

    const layout = {
      maxColumnsCount: maxColumns,
      rows: result
    };

    const template = (<any>Mustache).default.render(`<div class="grid grid-cols-{{maxColumnsCount}}">{{#rows}}{{#columns}}{{&elements}}{{/columns}}{{/rows}}</div>`, layout);

    return template;
  }
}
