import React from "react";
import "./Home.css";
import hero from "../assets/hero.png";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero container py-5 d-flex align-items-center justify-content-between">
        <div className="hero-text">
          <h1 className="display-4 fw-bold">
            All-in-<span className="highlight">one</span> workspace
          </h1>
          <p className="text-muted mb-4">
            One tool for your whole team. Write, plan, and get organized.
          </p>

          <div className="d-flex">
            <input
              type="email"
              className="form-control form-control-lg me-3"
              placeholder="Enter your email"
              style={{ maxWidth: "300px" }}
            />
            <button className="btn btn-warning btn-lg fw-bold">Get Started</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={hero} alt="workspace" className="img-fluid" />
        </div>
      </section>

      {/* Feature Section */}
      <section className="features container py-5 text-center">
        <div className="row">
          <div className="col-md-4">
            <h5>🚀 Time management</h5>
            <p>Stay focused and manage your job applications effectively.</p>
          </div>
          <div className="col-md-4">
            <h5>💼 Projects & tasks</h5>
            <p>Track applied jobs, interviews, and status updates easily.</p>
          </div>
          <div className="col-md-4">
            <h5>🧠 Motivation tools</h5>
            <p>Get reminders, career tips, and personalized suggestions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
