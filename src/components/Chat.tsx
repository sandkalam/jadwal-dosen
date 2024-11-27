/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export default function Chat() {
  const [reciever, setReciever] = useState<any>([]);
  const [sender, setSender] = useState<any>([]);
  const [message, setMessage] = useState<string>("");
  const [selectedReciever, setSelectedReciever] = useState<any>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const data = localStorage.getItem("data");
      if (data) {
        setReciever(JSON.parse(data));
      } else {
        setReciever([]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleJurusan = (e: any) => {
    setSender({ ...sender, jurusan: e.target.value });
  };
  const handlePengirim = (e: any) => {
    setSender({ ...sender, pengirim: e.target.value });
  };
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSelect = (e: any) => {
    localStorage.setItem("selectedReciever", e.target.value);
    setSelectedReciever(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // send data to whatsapp
    const nohp = reciever[selectedReciever].nohp;
    // format nohp
    const nohpFormat = nohp
      .replace(/\s+/g, "")
      .replace("08", "62")
      .replace("+", "")
      .replace("-", "");
    // encode
    const format = (message: string) => {
      return encodeURIComponent(message);
    };
    const messageFormat = format(message);

    // send to whatsapp
    const url = `https://wa.me/${nohpFormat}?text=${messageFormat}`;
    window.open(url, "_blank");
  };
  return (
    <div className="container mx-auto pt-10 pb-5 print:hidden">
      <div className="card bg-base-100">
        <div className="card-body">
          <h1 className="text-4xl font-bold text-center mb-3">Chat</h1>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 ">
        <div className="card bg-base-100 shadow-xl p-4">
          <h3 className="text-2xl font-bold text-center mb-3">Penerima</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pilih Penerima</span>
              </label>
              <select
                className="select select-bordered w-full"
                onChange={handleSelect}
              >
                <option>Pilih Penerima</option>
                {Object.keys(reciever).map((key: any) => (
                  <option key={key} value={key}>
                    {reciever[key].name}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pengirim">Pengirim</label>
                  <input
                    type="text"
                    id="pengirim"
                    className="input input-bordered w-full"
                    onChange={handlePengirim}
                  />
                </div>
                <div>
                  <label htmlFor="kelas">Jurusan</label>
                  <input
                    type="text"
                    id="jurusan"
                    className="input input-bordered w-full"
                    onChange={handleJurusan}
                  />
                </div>
              </div>
              <label htmlFor="message">Pesan</label>
              <textarea
                id="message"
                className="textarea textarea-bordered w-full"
                onChange={handleMessage}
              ></textarea>
              <button type="submit" className="btn btn-primary w-full mt-4">
                Kirim
              </button>
            </div>
          </form>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="text-2xl font-bold text-center mb-3">Pesan</h3>
            {/* chat */}

            <div className="chat chat-end bg-gray-100 p-4">
              <div className="chat-bubble max-w-sm bg-white text-black">
                <div className="chat-header">
                  <div className="chat-title font-bold">{sender.pengirim}</div>
                </div>
                <div className="chat-bubble-text text-lg whitespace-pre-wrap max-w-xs overflow-y-auto">
                  {message}
                </div>
                <div className="chat-timestamp text-sm text-gray-500 justify-end">
                  {new Date().getHours() < 10
                    ? "0" + new Date().getHours()
                    : new Date().getHours()}
                  :
                  {new Date().getMinutes() < 10
                    ? "0" + new Date().getMinutes()
                    : new Date().getMinutes()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
