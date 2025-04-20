import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MakeSuggestion from "./MakeSuggestion";
import { AuthContext } from "../Context/AuthContext";

// Mock axios to prevent actual HTTP requests
jest.mock("axios");

// MESSAGE: nem néztem meg itt mire kell az axios de ha lehet ki kéne cserélni
//    a backendApi-val ( src/backendApi.js )

const renderWithAuth = (ui, { providerProps }) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      {ui}
    </AuthContext.Provider>
  );
};

describe("MakeSuggestion Component", () => {
  const defaultUser = { id: 1, sub: "testuser", roles: [] };
  const token = "fake-token";

  it("renders Create, Modify and Delete buttons", () => {
    renderWithAuth(<MakeSuggestion />, {
      providerProps: { user: defaultUser, token },
    });

    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("Modify")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("shows new_word and new_icons inputs in Create tab", () => {
    renderWithAuth(<MakeSuggestion />, {
      providerProps: { user: defaultUser, token },
    });

    expect(screen.getByPlaceholderText("Word")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Emoji")).toBeInTheDocument();
  });

  it("shows error messages if form is submitted empty", async () => {
    renderWithAuth(<MakeSuggestion />, {
      providerProps: { user: defaultUser, token },
    });

    fireEvent.click(screen.getByText("Create")); // Ensure we're on the right tab
    fireEvent.click(screen.getByText("Create")); // This is the submit button too

    await waitFor(() => {
      expect(screen.getByText("Word is required!")).toBeInTheDocument();
      expect(screen.getByText("Emoji is required!")).toBeInTheDocument();
      expect(screen.getByText("Reason is required!")).toBeInTheDocument();
    });
  });
});
