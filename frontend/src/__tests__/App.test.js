import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App.js";

global.innerWidth = 1024;

describe("App component", () => {
  it("renders Sidebar correctly on desktop", () => {
    render(<App />);

    const sidebarElement = screen.getByRole("navigation");
    expect(sidebarElement).toBeInTheDocument();
    expect(sidebarElement).toHaveStyle("width: 20%");
  });

  it("adjusts Sidebar width on mobile", () => {
    global.innerWidth = 500; 


    render(<App />);

    const sidebarElement = screen.getByRole("navigation");
    expect(sidebarElement).toHaveStyle("width: 100%");
  });

  it("renders sidebar buttons correctly", () => {
    render(<App />);

    const makeSuggestionButton = screen.getByText(/Make suggestion/i);
    expect(makeSuggestionButton).toBeInTheDocument();

    const readSuggestionsButton = screen.getByText(/Read suggestions/i);
    expect(readSuggestionsButton).toBeInTheDocument();

    const modRequestButton = screen.getByText(/View Mod Requests/i);
    expect(modRequestButton).toBeInTheDocument();

    const becomeModButton = screen.getByText(/Become Mod/i);
    expect(becomeModButton).toBeInTheDocument();
  });
});
