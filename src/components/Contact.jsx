import { Link } from "react-router-dom";
import { CURRENTLINE, YELLOW, CYAN, RED } from "../helpers/color";
const Contact = ({contact,confirmDelete}) => {
  return (
    <>
      <div className="col-md-6 card" style={{ backgroundColor: CURRENTLINE }}>
        <div className="card-body p-3">
          <div className="row d-flex align-items-center justify-content-around">
            <div className="col-md-4">
              <img className="rounded" id="img_contact" src={contact.photo || "https://placehold.co/150"} alt="" />
            </div>
            <div className="col-md-7">
              <div className="list-group">
                <div className="list-group-item list-group-item-dark">
                  نام و نام خانوادگی:{" "}
                  <span className="fw-bold">{contact.fullname}</span>
                </div>
                <div className="list-group-item list-group-item-dark">
                  شماره موبایل:
                  <span className="fw-bold">{contact.mobile}</span>
                </div>
                <div className="list-group-item list-group-item-dark">
                  شغل:
                  <span className="fw-bold">{contact.job}</span>
                </div>
                <div className="list-group-item list-group-item-dark">
                  ایمیل:
                  <span className="fw-bold">{contact.email}</span>
                </div>
              </div>
            </div>
            <div id="container_btn" className="col-md-1">
              <Link to={contact.id} className="btn" style={{ backgroundColor: YELLOW }}>
                <i className="fa fa-eye"></i>
              </Link>
              <Link to={`edit/${contact.id}`} className="btn" style={{ backgroundColor: CYAN }}>
                <i className="fa fa-pencil"></i>
              </Link>
              <button onClick={confirmDelete}  className="btn" style={{ backgroundColor: RED }}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
