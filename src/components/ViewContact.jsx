import React from 'react'
import { useState, useEffect } from "react"
import { getGroup, getContact } from '../services/contactService'
import Spinner from './Spinner'

import { Link, useParams } from 'react-router-dom'
import { CYAN, CURRENTLINE, PURPLE, GREEN, COMMENT } from '../helpers/color'




const ViewContact = () => {
  const { contactId } = useParams()
  const [state, Setstate] = useState({
    loading: false,
    contact: {},
    group: {}
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        Setstate({ ...state, loading: true })
        const { data: contactData } = await getContact(contactId)
        const { data: groupData } = await getGroup(contactData.group)
        Setstate({ ...state, loading: false, contact: contactData, group: groupData })


      } catch (error) {
        console.log(error.message)
        Setstate({ ...state, loading: false })

      }
    }
    fetchData()
  }, []
  )

  const { contact, group, loading } = state

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
                View Contact
              </p>
            </div>
          </div>
          <hr style={{ backgroundColor: GREEN }} />

          {
            loading ? (<Spinner />) : (
              <div className="row mt-5">
                <div className="col-md-4">
                  <ul className='list-group'>
                    <li className="list-group-item list-group-item-dark">
                      نام خانوادگی: <span className='fw-bold'>{contact.fullname}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      شماره موبایل: <span className='fw-bold'>{contact.mobile}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      ایمیل: <span className='fw-bold'>{contact.email}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      شغل: <span className='fw-bold'>{contact.job}</span>
                    </li>
                    <li className="list-group-item list-group-item-dark">
                      گروه: <span className='fw-bold'>{group.name}</span>
                    </li>
                    
                  </ul>



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

export default ViewContact
