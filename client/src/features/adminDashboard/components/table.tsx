import Table from "react-bootstrap/Table";

export function AdminTable({ headers, data }) {
  //TODO make it so that every component who uses the table have to construct its own headers
  //atm every single key from the data objects are set as headers which is unneccesary
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>

          {Object.keys(data[0]).map((header, index) => {
            return (
              <td key={index}>
                <p>{header}</p>
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {/* {data.map((datum, index) => {
          return (
            <tr key={datum._id}>
              {Object.keys(data[0]).map((header, index) => {
                <td key={index}>
                  <span>{datum[header]}</span>
                </td>;
              })}
            </tr>
          );
        })} */}
      </tbody>
    </Table>
  );
}
