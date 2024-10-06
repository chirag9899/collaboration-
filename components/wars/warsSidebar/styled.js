import {styled} from "styled-components";
import Panel from "../../styled/panel";
import { primary_color, white_text_color } from "@/components/styles/colors";

export const Sidebar = styled(Panel)`
  display: flex;
  min-height: 0;
  /* flex: 1; */
  flex-direction: column;
  border-right: 1px solid #e2e8f0;
  background-color: var(--background-0);
  max-width: 25%;

  .sidebar-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
    padding-top: 1.25rem;

    .header {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      padding: 0 1rem;

      a {
        flex-grow: 1;
        cursor: pointer;
        font-size: 1.875rem;
      }
    }

    nav {
      margin-top: 1.25rem;
      flex: 1;
      background-color: transparent;
      padding: 0 0.5rem;

      a {
        display: flex;
        align-items: center;
        border-radius: 0.375rem;
        padding: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        justify-content: space-between;
        font-weight: bold;

        &:hover {
          background-color: ${primary_color};
          color: ${white_text_color};
        }

        svg {
          margin-right: 10px;
          height: 1.5rem;
          width: 1.5rem;
        }
      }

      .active {
        background-color: ${primary_color};
        color: ${white_text_color};

        svg {
          color: ${white_text_color};
        }
      }
    }

    .sponsors {
      padding: 0 1.25rem;
      text-align: center;
      color: #94a3b8;

      h2 {
        font-size: 1.25rem;
      }

      p {
        margin-top: 1rem;
        font-size: 0.75rem;
      }

      .sponsor-logos {
        display: flex;
        margin-top: 1rem;
        justify-content: center;

        a {
          margin-left: 1rem;

          img {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
  }

  footer {
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: center;

    a {
      color: #94a3b8;

      &:hover {
        color: #64748b;
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }

      svg {
        height: 1.5rem;
        width: 1.5rem;
      }
    }
  }
`;