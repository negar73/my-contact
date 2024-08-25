import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { COMMENT, GREEN, PURPLE } from "../helpers/color";

const AddContact = ({loading, groups, contact, setContactInfo, createContactForm}) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBhcplevwUKGRs1P-Ps8Mwf2wOwnW_R_JIA&s"
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  <form onSubmit={createContactForm}>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="fullname"
                        value={contact.fullname}
                        onChange={setContactInfo}
                        className="form-control"
                        placeholder="نام و نام خانوادگی"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="photo"
                        value={contact.photo}
                        onChange={setContactInfo}
                        className="form-control"
                        placeholder="آدرس تصویر"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="mobile"
                        value={contact.mobile}
                        onChange={setContactInfo}
                        className="form-control"
                        placeholder="شماره موبایل"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={setContactInfo}
                        className="form-control"
                        placeholder="آدرس ایمیل"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="job"
                        value={contact.job}
                        onChange={setContactInfo}
                        className="form-control"
                        placeholder="شغل"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        className="form-control"
                        required={true}
                        value={contact.group}
                        onChange={setContactInfo}
                      >
                        <option value="">انتخاب گروه</option>
                        { groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ساخت مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default AddContact;
