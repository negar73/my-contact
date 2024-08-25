import React from 'react'
import { useState, useEffect } from "react"
import { getContact, updateContact, getAllGroups } from '../services/contactService'
import Spinner from './Spinner'

import { Link, useNavigate, useParams } from 'react-router-dom'
import {  PURPLE, GREEN, COMMENT } from '../helpers/color'

const EditContact = ({ forceRender, setForceRender }) => {
  const navigate = useNavigate()
  const { contactId } = useParams()
  const [state, setState] = useState({
    loading: false,
    contact: {
      fullname: "",
      mobile: "",
      email: "",
      job: "",
      group: "",
      photo: ""
    },
    groups: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true })

        const { data: contactData } = await getContact(contactId)
        const { data: groupsData } = await getAllGroups()


        setState({ ...state, loading: false, contact: contactData, groups: groupsData })


      } catch (err) {
        console.log(err.message)
        setState({ ...state, loading: false })
      }
    }
    fetchData()
  }, [])

  

  const setContactInfo = (event) => {
    setState({
      ...state,

      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    })
  }

  const submitForm = async (event) => {
    event.preventDefault()
    try {
      setState({ ...state, loading: true })

      const { data } = await updateContact(state.contact, contactId)

      setState({ ...state, loading: false })

      if (data) {
        setForceRender(!forceRender)
        navigate("/contacts")
      }
    } catch (err) {
      console.log(err)
      setState({ ...state, loading: false })

    }
  }
  const { contact, groups, loading } = state


  return (
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
                Edit Contact
              </p>
            </div>
          </div>
          <hr style={{ backgroundColor: GREEN }} />

          {
            loading ? (<Spinner />) : (
              <div className="row mt-5">
                <div className="col-md-4">
                <form onSubmit={submitForm}>
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
                        value="ویرایش مخاطب"
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



                  <div className="mx-2">
                    <div className='col-12 flex-reverse'>
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        بازگشت به صفحه اصلی
                      </Link>
                    </div>
                  </div>
                </div>
              </div >
            )
          }



        </div>

      </section >
    </>
  )
}

export default EditContact
