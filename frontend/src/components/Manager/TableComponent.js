

const TableComponent = ({ columns, data, generateRow }) => {
    return (
        <table className="table datatable">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    generateRow(item, index)
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;