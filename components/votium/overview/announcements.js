import { primary_color } from "@/components/styles/colors";
import styled from "styled-components";

const AnnouncementCard = styled.div`
  border: 1px solid ${primary_color};
  border-radius: 8px;
  padding: 16px;
  background-color: var(--background-1);
`;

const CardNoHeader = styled.div`
  /* Style for card header (if any specific styles are needed) */
`;

const CardBody = styled.div`
  padding: 16px;
`;

const Announcements = styled.div`
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  span {
    font-size: 16px;

    a {
      color: ${primary_color};
      text-decoration: underline;

      &:hover {
        color: #2980b9;
      }
    }
  }
`;

const Announcement = () => {
  return (
    <AnnouncementCard>
      <CardNoHeader />
      <CardBody>
        <Announcements>
          <h1>
            Join our official Discord server for emotional and tech support!
          </h1>
          <span>
            <a
              href="https://medium.com/@llamaairforce/discord-7a6c25a2b454"
              target="_blank"
              rel="noopener noreferrer"
            >
              You can read our announcement here.
            </a>
          </span>
        </Announcements>
      </CardBody>
    </AnnouncementCard>
  );
};

export default Announcement;
