import MessageList from '../../../components/message-list';
import UsersList from '../../../components/users-list';

async function getMessages(destination: string) {
  const response = await fetch(`${process.env.API_URL}/api/messages/${destination}`);

  return response.json();
}

export async function getUsers() {
  const response = await fetch(`${process.env.API_URL}/api/users`);
  return response.json();
}

export default async function Conversation({
  params,
}: {
  params: { destination: string };
}) {
  if (!params.destination) {
    return <></>;
  }

  const messageResponse = await getMessages(params.destination);
  const usersResponse = await getUsers();

  return (
    <>
      <MessageList messages={messageResponse.messages} />
      <UsersList users={usersResponse.users} />
    </>
  );
}
