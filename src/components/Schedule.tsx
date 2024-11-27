/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

import { useState } from "react";

const Schedule = () => {
  type Waktu = {
    waktu_mulai: string;
    waktu_selesai: string;
  };
  interface JadwalItem {
    id: number;
    matakuliah: string;
    name: string;
    hari: string;
    waktu: Waktu;
  }
  const [jadwal, setJadwal] = useState<JadwalItem[]>([]);
  const [opsiJadwal, setOpsiJadwal] = useState<boolean>(true);
  const [waktuMulai, setWaktuMulai] = useState<string>("");
  const [waktuSelesai, setWaktuSelesai] = useState<string>("");
  const [hari, setHari] = useState<string>("");
  const [dataDosen, setDataDosen] = useState<any[]>([]);
  const [matakuliah, setMatakuliah] = useState<string>("");
  const [dosen, setDosen] = useState<number>(0);

  useEffect(() => {
    const dataJadwal = localStorage.getItem("jadwal");
    if (dataJadwal) {
      const jadwal: JadwalItem[] = JSON.parse(dataJadwal);
      setJadwal(jadwal);
    }
    // re-render element
    const interval = setInterval(() => {
      const dataDosen = localStorage.getItem("data");
      if (dataDosen) {
        setDataDosen(JSON.parse(dataDosen));
      } else {
        setDataDosen([]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleTambahJadwal = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    modal?.showModal();
  };

  const handleImportJadwal = () => {
    // import jadwal from json
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;
        const data = JSON.parse(e.target.result as string);
        setJadwal(data);
        localStorage.setItem("jadwal", JSON.stringify(data));
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleExportJadwal = () => {
    // export jadwal to json
    const dataJadwal = JSON.stringify(jadwal, null, 2);
    const blob = new Blob([dataJadwal], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jadwal.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // const handleEditJadwal = (id: number) => {
  //   console.log("Edit Jadwal", id);
  // };

  const handleHapusJadwal = (id: number) => {
    const newJadwal = (dataJadwal: JadwalItem[]): JadwalItem[] =>
      dataJadwal.filter((jadwal) => jadwal.id !== id);
    setJadwal(newJadwal);
  };

  const handleOpsiJadwal = () => {
    setOpsiJadwal(!opsiJadwal);
  };

  const handleSubmitJadwal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setJadwal((prevJadwal) => {
      const newJadwal = [
        ...prevJadwal,
        {
          id: jadwal.length + 1,
          matakuliah: matakuliah,
          name: dosen.toString(),
          hari: hari,
          waktu: {
            waktu_mulai: waktuMulai,
            waktu_selesai: waktuSelesai,
          },
        },
      ];
      localStorage.setItem("jadwal", JSON.stringify(newJadwal));
      return newJadwal;
    });
    // localStorage.setItem("jadwal", JSON.stringify(jadwal));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // parsing string to number
    const idItem = parseInt(e.target.value);
    setMatakuliah(dataDosen[idItem].matakuliah);
    setDosen(dataDosen[idItem].name);
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="card bg-base-100">
          <div className="card-body justify-center grid grid-cols-1 gap-3">
            <h1 className="text-2xl font-bold text-center">Schedule</h1>
            <div className="grid grid-col-1">
              <div className="card bg-base-100">
                <table className="table border border-gray-300 print:border print:border-black">
                  <thead className="text-center rounded-md">
                    <tr className="bg-primary text-white">
                      <th className="rounded-tl-md w-5">No</th>
                      <th className="text-start">Mata Kuliah</th>
                      <th className="text-start">Dosen</th>
                      <th>Hari</th>
                      <th>Waktu</th>
                      <th className={opsiJadwal ? "hidden" : ""}>Opsi</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {Array.isArray(jadwal) &&
                      jadwal.map((item: JadwalItem) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td className="text-start">{item.matakuliah}</td>
                          <td className="text-start">{item.name}</td>
                          <td>{item.hari}</td>
                          <td>{`${item.waktu.waktu_mulai} - ${item.waktu.waktu_selesai}`}</td>
                          <td className={opsiJadwal ? "hidden" : ""}>
                            <button
                              className="btn btn-error"
                              data-tip="Hapus"
                              onClick={() => handleHapusJadwal(item.id)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex justify-end gap-3 mt-3 print:hidden">
                  <button
                    className="btn btn-primary"
                    onClick={handleTambahJadwal}
                  >
                    Tambah
                  </button>
                  <button
                    className="btn btn-info"
                    data-tip="Opsi"
                    onClick={handleOpsiJadwal}
                  >
                    Opsi
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleImportJadwal}
                  >
                    Import
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={handleExportJadwal}
                  >
                    Export
                  </button>
                  {/* popup tambah jadwal */}
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Tambah Jadwal</h3>
                      <form onSubmit={handleSubmitJadwal}>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Mata Kuliah</span>
                          </label>
                          <select
                            className="select select-primary"
                            onChange={handleSelect}
                          >
                            <option value="">Pilih Mata Kuliah</option>
                            {dataDosen.map((dosen, index) => (
                              <option key={dosen.id} value={index}>
                                {dosen.matakuliah}
                              </option>
                            ))}
                          </select>
                          <label className="label">
                            <span className="label-text">Hari</span>
                          </label>
                          <select
                            className="select select-primary"
                            onChange={(e) => setHari(e.target.value)}
                          >
                            <option value="">Pilih Hari</option>
                            <option value="Senin">Senin</option>
                            <option value="Selasa">Selasa</option>
                            <option value="Rabu">Rabu</option>
                            <option value="Kamis">Kamis</option>
                            <option value="Jumat">Jumat</option>
                            <option value="Sabtu">Sabtu</option>
                            <option value="Minggu">Minggu</option>
                          </select>
                          <div className="flex flex-row gap-3 mt-3">
                            <label className="label" htmlFor="waktuMulai">
                              <span className="label-text">Waktu Mulai</span>
                            </label>
                            <input
                              type="time"
                              className="input input-bordered border-primary w-full"
                              required
                              id="waktuMulai"
                              onChange={(e) => setWaktuMulai(e.target.value)}
                            />
                            <label className="label" htmlFor="waktuSelesai">
                              <span className="label-text">Waktu Selesai</span>
                            </label>
                            <input
                              type="time"
                              className="input input-bordered border-primary w-full"
                              required
                              id="waktuSelesai"
                              onChange={(e) => setWaktuSelesai(e.target.value)}
                              min={waktuMulai}
                            />
                          </div>
                          <button
                            className="btn btn-primary mt-3"
                            type="submit"
                          >
                            Tambah
                          </button>
                        </div>
                      </form>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  {/* popup edit jadwal */}
                  {/* TODO: edit jadwal  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
