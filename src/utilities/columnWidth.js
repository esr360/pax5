export default function columnWidth(columns, row, column, gutter, config) {
    if (!column.PAX5) {
        return;
    }

    let width = '100%';

    if (Object.keys(column.PAX5).some(j => ~j.indexOf('breakpoint-')) || typeof column.PAX5.width === 'object') {
        const foo = column.PAX5.width || Object.keys(column.PAX5).filter(key => key.indexOf('breakpoint-') === 0).reduce((acc, cur) => {
            acc[cur] = column.PAX5[cur];

            return acc;
        }, {});

        Object.keys(foo).forEach((rule, index) => {
            if (window.matchMedia(`(min-width: ${config.breakpoints[`breakpoint-${index + 1}`]})`).matches) {
                if (foo[`breakpoint-${index + 1}`]) {
                    return width = `${100 / foo[rule][1] * foo[rule][0]}%`;
                }
            }
        });
    }
    
    else {
        for (let i = 0; i < columns; i++) {
            if (column.PAX5.width == i) {
                width = `${100 / columns * i}%`;
            }
        }
    }

    if (!row.PAX5['no-gutter']) {
        width = `calc(${width} - ${gutter})`;
    }

    if (column.shouldBeStacked && !(Object.keys(column.PAX5).some(j => ~j.indexOf('breakpoint-')) || typeof column.PAX5.width === 'object')) {
        width = `calc(100% - ${gutter})`;
    }

    return width;
}