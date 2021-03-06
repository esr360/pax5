import columnWidth from './utilities/columnWidth';
import offsetWidth from './utilities/offsetWidth';
import shouldBeStacked from './utilities/shouldBeStacked';

export default (row, config) => {
    const columns = config.columns;
    const gutter = config.gutter;

    return {
        'display': 'flex',
        'margin-bottom': '1em',
        'flex-flow': 'wrap',
        'flex-direction': row.PAX5.reverse ? 'row-reverse' : false,
        'margin-left': row.PAX5['no-gutter'] ? 0 : `-${gutter}`,

        column: column => {
            column.shouldBeStacked = shouldBeStacked(row, config);

            const requiredWidth = column.PAX5.width || Object.keys(column.PAX5).some(key => ~key.indexOf('breakpoint-'));

            return {
                'flex' : !requiredWidth && !column.shouldBeStacked ? 1 : 'none',
                'position': 'relative',
                'margin-left': row.PAX5['no-gutter'] ? 0 : `${gutter}`,
                'width': columnWidth(columns, row, column, gutter, config),
                'left' : column.PAX5.push && !column.shouldBeStacked ? offsetWidth(columns, column, 'push') : 'initial',
                'right': column.PAX5.pull && !column.shouldBeStacked ? offsetWidth(columns, column, 'pull') : 'initial'
            }
        }
    };
}