import { useState } from "react";
import Axios from "axios";
import { toastr } from "react-redux-toastr";

export default function Contact(props) {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState();
  //const [fromSubmit, setFromSubmit] = useState();

  let handleSubmit = async event => {
    event.preventDefault();
    setMessage("Sending ...");
    //if (values.length < 3) return;
    try {
      let res = await Axios.post("/other/contact", formData);
      console.log(res);
      if (res.status === 200) setMessage("Message Sent!");
    } catch (error) {
      console.log(error);
      let message = error.data ? error.data.message : error.message;
      setMessage(message);
    }
  };
  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="section-title">
                <h2 className="main">Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>

              <form
                name="sentMessage"
                id="contactForm"
                className="w-100"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        value={formData.name}
                        onChange={e =>
                          setFormData(prev => {
                            return { ...prev, [e.target.name]: e.target.value };
                          })
                        }
                      />
                      <p
                        className="help-block text-danger"
                        hidden={!message || formData.name}
                      >
                        This field is required
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={e =>
                          setFormData(prev => {
                            return { ...prev, [e.target.name]: e.target.value };
                          })
                        }
                        value={formData.email}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={e =>
                      setFormData(prev => {
                        return { ...prev, [e.target.name]: e.target.value };
                      })
                    }
                    value={formData.message}
                  ></textarea>
                </div>
                <div id="success"></div>
                <button type="submit" className=" bttn-custom ">
                  Send Message
                </button>
              </form>

              <div
                class={`alert alert-${
                  message?.includes("Sent") || message?.includes("Sending")
                    ? "success"
                    : "danger"
                }`}
                role="alert"
                hidden={!message}
              >
                {message}
              </div>
            </div>
            <div className="col-md-3 offset-md-1 contact-info">
              <div className="contact-item">
                <h3>Contact Info</h3>
                <p>
                  <span>
                    <i className="fa fa-map-marker"></i> Address
                  </span>
                  {props.data ? props.data.address : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-phone"></i> Phone
                  </span>{" "}
                  {props.data ? props.data.phone : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-envelope-o"></i> Email
                  </span>{" "}
                  {props.data ? props.data.email : "loading"}
                </p>
              </div>
            </div>

            <div className="col-md-12">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : "/"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>&copy; 2020 IDoctor</p>
        </div>
      </div>
    </div>
  );
}
