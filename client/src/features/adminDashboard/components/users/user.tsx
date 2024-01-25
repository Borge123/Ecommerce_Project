import { Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
export function User() {
  const { user } = useLoaderData();
  return (
    <Col className="md-8">
      <h1>User info</h1>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Full Name</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">ID</h6>
          </div>
          <div className="col-sm-9 text-secondary"> {user._id}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Role</h6>
          </div>
          <div className="col-sm-9 text-secondary"> {user.role}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Mobile</h6>
          </div>
          <div className="col-sm-9 text-secondary"> (320) 380-4539</div>
        </div>
        <hr />
        {user.billinginfo ? (
          <>
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Address</h6>
              </div>

              <div className="col-sm-9 text-secondary">
                {" "}
                {user.billinginfo.address} {user.billinginfo.house_number}{" "}
                {user.billinginfo.zip} {user.billinginfo.city}
              </div>
            </div>
            <hr />
          </>
        ) : (
          ""
        )}

        <div className="row">
          <div className="col-sm-12">
            {" "}
            <a className="btn btn-info " target="__blank" href="">
              Edit
            </a>
          </div>
        </div>
      </div>
      <div></div>
    </Col>
  );
}
