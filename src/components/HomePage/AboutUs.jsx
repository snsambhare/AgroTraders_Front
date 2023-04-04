import React from "react";
import "./AboutUs.css";

const ContactUs2 = () => {
  return (
    <>
      <div className="allbody">
        <section id="ABOUT">
          <div class="about-1">
            <h1> ABOUT US </h1>
            <br></br>
            <br></br>
            <p>
              When farmers have the tools they need to connect with one another,
              they're far more likely to apply what they've learned on their
              farms and in their households - improving their own livelihoods
              and those of others in their community, in a manner that's
              nutrition-sensitive, climate-resilient, and inclusive. Since day
              one, our deeply committed, curious and collaborative team has been
              challenged and inspired. We've tried and failed and tried again,
              and have ultimately become leaders in using technology for global
              development.
            </p>
          </div>
          <div id="about-2">
            <div class="content-box-lg">
              <div class="container">
                <div class="row">
                  <div class="col-md-4">
                    <div class="about-item text-center">
                      <i class="fa fa-book"></i>
                      <h3>MISSION</h3>
                      <hr />
                      <p>
                        {" "}
                        Our Aim is to reach each and every Farmers in india to
                        to help them to eliaminate the middle man in in the
                        market . And give them the power to decides their goods
                        value . To empower farmers to increase agricultural
                        productivity and profitability.{" "}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="about-item text-center">
                      <i class="fa fa-globe"></i>
                      <h3>VISION</h3>
                      <hr />
                      <p>
                        {" "}
                        To empower farmers to increase agricultural productivity
                        and profitability. We supporting them in agriculture
                        sector to doubling their incomes . We will work as a
                        connecting node between farmers and consumers by
                        bringing them on the same platform.{" "}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="about-item text-center">
                      <i class="fa fa-pencil"></i>
                      <h3>ACHIEVEMENTS</h3>
                      <hr />
                      <p>
                        {" "}
                        <br />
                        Everyone is looking to work and make money to survive.
                        But we are fortunate that we are able to do this while
                        helping farmers and doing our bit of good in the world.
                        <br />
                        <br />{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="text-center">
          <p>Copyright &copy; 2022 All rights reserved by AgroTraders</p>
        </footer>
      </div>
    </>
  );
};

export default ContactUs2;
