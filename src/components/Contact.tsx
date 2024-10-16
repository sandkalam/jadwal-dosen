import { useEffect, useState } from "react";
import { ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";

type data = {
  id: number;
  name: string;
  matakuliah: string;
  nohp: string;
};

const Contact = () => {
  const [data, setData] = useState<data[]>([]);
  const [idElm, setIdElm] = useState<number | null>(null);

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("data");
    if (dataFromLocalStorage) {
      setData(JSON.parse(dataFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    if (idElm) {
      const modal = document.getElementById("opsiModal");
      if (modal instanceof HTMLDialogElement) {
        modal.setAttribute("data-id", idElm.toString());
      }
    }
  }, [idElm]);

  const handleImport = () => {
    // add json and csv support
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json, .csv";
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = JSON.parse(e.target?.result as string);
          setData(data);
          localStorage.setItem("data", JSON.stringify(data));
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
    fileInput.remove();
  };

  const handleExport = () => {
    const file = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // menolak jika form masih kosong
    const nama = (document.getElementById("nama") as HTMLInputElement)?.value;
    const matakuliah = (
      document.getElementById("matakuliah") as HTMLInputElement
    )?.value;
    const nohp = (document.getElementById("nohp") as HTMLInputElement)?.value;
    const nohpFormat = nohp
      .replace(/\s+/g, "")
      .replace("08", "62")
      .replace(/\+/g, "")
      .replace(/-/g, "");

    if (!nama && !matakuliah && !nohp) {
      alert("Form tidak boleh kosong");
      return;
    }

    setData((prevData) => {
      const newData = [
        ...prevData,
        { id: prevData.length + 1, name: nama, matakuliah, nohp: nohpFormat },
      ];
      localStorage.setItem("data", JSON.stringify(newData));
      return newData;
    });

    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  const handleHapus = () => {
    const modal = document.getElementById("hapusModal");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }

    const index = data.findIndex((item) => item.id === idElm);
    if (index !== -1) {
      data.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(data));
      // Memperbarui state untuk memicu render ulang
      setData([...data]);
    }
    const opsiModal = document.getElementById("opsiModal");
    if (opsiModal instanceof HTMLDialogElement) {
      opsiModal.close();
    }
  };

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editNama = (document.getElementById("editNama") as HTMLInputElement)
      ?.value;
    const editMatakuliah = (
      document.getElementById("editMatakuliah") as HTMLInputElement
    )?.value;
    const editNohp = (document.getElementById("editNohp") as HTMLInputElement)
      ?.value;

    if (!editNama && !editMatakuliah && !editNohp) {
      alert("Form tidak boleh kosong");
      return;
    }

    setData((prevData) => {
      const newData = prevData.map((item) => {
        if (item.id === idElm) {
          return {
            ...item,
            name: editNama,
            matakuliah: editMatakuliah,
            nohp: editNohp,
          };
        }
        return item;
      });
      localStorage.setItem("data", JSON.stringify(newData));
      return newData;
    });

    const modal = document.getElementById("editModal");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
    const opsiModal = document.getElementById("opsiModal");
    if (opsiModal instanceof HTMLDialogElement) {
      opsiModal.close();
    }

    setIdElm(null);
    setData([...data]);
  };

  return (
    <div>
      <div className="container mx-auto py-5">
        <h1 className="text-4xl font-bold text-center mb-3">Contact</h1>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 ">
          <div className="card bg-base-100 shadow-xl">
            <form className="p-4 form-control gap-3" onSubmit={handleSubmit}>
              <label htmlFor="nama">Nama</label>
              <input
                id="nama"
                type="text"
                placeholder="Nama"
                required
                className="input input-bordered input-primary w-full"
              />
              <label htmlFor="matakuliah">Matakuliah</label>
              <input
                id="matakuliah"
                type="text"
                placeholder="Matakuliah"
                className="input input-bordered input-primary w-full"
              />
              <label htmlFor="nohp">No. HP</label>
              <input
                id="nohp"
                type="text"
                placeholder="08xxxxxxxxxx"
                className="input input-bordered input-primary w-full"
              />

              <button className="btn btn-primary mt-4">Simpan</button>
            </form>
          </div>
          <div className="card bg-base-100 shadow-xl  overflow-y-auto max-h-[400px]">
            <table className="table">
              <thead>
                <tr className="sticky top-0 bg-base-100">
                  <th className="w-10">No</th>
                  <th>Nama</th>
                  <th>Matakuliah</th>
                  <th>No. HP</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {localStorage.getItem("data") &&
                  JSON.parse(localStorage.getItem("data") || "[]").map(
                    (
                      item: {
                        id: number;
                        name: string;
                        matakuliah: string;
                        nohp: string;
                      },
                      index: number
                    ) => (
                      <tr key={index} id={item.id.toString()} className="hover">
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.matakuliah}</td>
                        <td>{item.nohp}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary rounded-md"
                            onClick={() => {
                              const modal =
                                document.getElementById("opsiModal");
                              if (modal instanceof HTMLDialogElement) {
                                modal.showModal();
                                setIdElm(item.id);
                              }
                            }}
                          >
                            Opsi
                          </button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <div className="flex gap-4 justify-start align-middle p-4 sticky bottom-0 bg-base-100">
              <button
                className="btn btn-primary rounded-md"
                onClick={handleImport}
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Import
              </button>
              <button
                className="btn btn-secondary rounded-md"
                onClick={handleExport}
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
                Export
              </button>
            </div>
          </div>
          {/* popup */}
          {/* Open the modal using document.getElementById('ID').showModal() method */}

          <dialog id="opsiModal" className="modal">
            <div className="modal-box flex flex-col gap-4 items-center justify-center">
              <h3 className="font-bold text-lg text-center">Opsi</h3>
              <hr className="w-full" />
              <div className="flex flex-col gap-4 w-full">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    const modal = document.getElementById("editModal");
                    if (modal instanceof HTMLDialogElement) {
                      modal.showModal();
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    const modal = document.getElementById("hapusModal");
                    if (modal instanceof HTMLDialogElement) {
                      modal.showModal();
                    }
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog id="editModal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Edit</h3>
              <form className="form-control" onSubmit={handleSubmitEdit}>
                <label htmlFor="editNama">Nama</label>
                <input
                  id="editNama"
                  type="text"
                  placeholder="Nama"
                  defaultValue={data.find((item) => item.id === idElm)?.name}
                  className="input input-bordered input-primary w-full"
                />
                <label htmlFor="editMatakuliah">Matakuliah</label>
                <input
                  id="editMatakuliah"
                  type="text"
                  placeholder="Matakuliah"
                  defaultValue={
                    data.find((item) => item.id === idElm)?.matakuliah
                  }
                  className="input input-bordered input-primary w-full"
                />
                <label htmlFor="editNohp">No. HP</label>
                <input
                  id="editNohp"
                  type="text"
                  placeholder="08xxxxxxxxxx"
                  defaultValue={data.find((item) => item.id === idElm)?.nohp}
                  className="input input-bordered input-primary w-full"
                />
                <button className="btn btn-primary mt-4">Simpan</button>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {/* dialog hapus */}
          <dialog id="hapusModal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hapus</h3>
              <p>Apakah anda yakin ingin menghapus data ini?</p>
              <div className="modal-action">
                <button className="btn btn-primary" onClick={handleHapus}>
                  Ya
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    const modal = document.getElementById("hapusModal");
                    if (modal instanceof HTMLDialogElement) {
                      modal.close();
                    }
                  }}
                >
                  Tidak
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Contact;
