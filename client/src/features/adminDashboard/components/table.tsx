import Table from "react-bootstrap/Table";

export function AdminTable({ headers, data }) {
  //TODO make it so that every component who uses the table have to construct its own headers
  //atm every single key from the data objects are set as headers which is unneccesary
  console.log(data);

  return (
    <Table responsive>
      <thead>
        <tr>
          {headers.map((header) => {
            return (
              <th scope="col" key={header}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((datum, index) => {
          return (
            <tr key={datum._id}>
              {datum.billinginfo ? (
                //TODO figure out a better way to deal with nested objects
                <>
                  <td>{datum.billinginfo?.address}</td>
                  <td>{datum.billinginfo?.city}</td>
                  <td>{datum.billinginfo?.house_number}</td>
                  <td>{datum.billinginfo?.zip}</td>
                </>
              ) : (
                <td>Empty</td>
              )}

              <td>{datum._id}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
