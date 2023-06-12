import { Stack, ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";

import { Session } from "../../../../types/movie";
import { useSessions } from "../../../../hooks/useSessions";
import { SessionListItem } from "../sessionListItem"

export const SessionList = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const { getAllSessions, deleteSession } = useSessions();

  useEffect(() => {
    getAllSessions().then(data => {
      setSessions(data);
    });
  }, []);

  const handleDeleteSession = async (sessionId: number) => {
    deleteSession(sessionId);
    setSessions(sessions =>
      sessions.filter(sesssion => sesssion.id !== sessionId)
    );
  };

  return (
    <>
      <ScrollArea h={600}>
        <Stack>
          {sessions.map((session, idx) => (
            <SessionListItem 
              key={idx}
              sessionId={session.id}
              roomName={session.room_fk.name}
              movieTitle={session.movie_fk.title}
              renderDateAndButton={true}
              datetime={new Date(session.datetime)}
              onClickHandle={handleDeleteSession}
            />
          ))}
        </Stack>
      </ScrollArea>
    </>
  );
};
