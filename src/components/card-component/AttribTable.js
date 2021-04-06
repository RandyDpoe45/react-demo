
const AttribTable = props  => {
    function getPropertyValue (object,path){
        let properties = Array.isArray(path) ? path : path.split(".");
        let x = properties.reduce((prev, curr) => prev && prev[curr], object);
        return x;
    }
    return (
        <table className="Card-table">
            <thead>
                <tr>
                    <th>Atributo</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                {props.properties.map( obj => 
                    <tr key={obj.label}>
                        <td>{obj.label}</td>
                        <td>{getPropertyValue(props.object,obj.path)}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default AttribTable;