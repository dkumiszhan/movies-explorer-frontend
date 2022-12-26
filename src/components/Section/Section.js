import React from "react";

function Section(props) {
    return (
        <section className="section">
            <h2 className="section__title">{props.title}</h2>
        </section>
    );
}