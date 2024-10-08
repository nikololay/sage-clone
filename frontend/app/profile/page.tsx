import Chat from "../../components/Chat";

function UserProfile() {
  return (
    <div>
      <h1>this is the user profile</h1>
    </div>
  );
}

export default function Profile() {
  // i need 2 columns, each taking up half the screen width

  return (
    <div className="flex flex-row h-full">
      <div className="w-8/12 p-4 flex h-full flex-col">
        <h1>Profile chat</h1>
        <div className="flex-1 overflow-hidden">
          <Chat />
        </div>
      </div>
      <div className="w-4/12 p-4">
        <UserProfile />
      </div>
    </div>
  );
}
