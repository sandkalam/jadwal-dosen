`
<!-- Template -->
        <div class="d-none col-md-3">
          <div class="card mt-3 shadow">
            <div class="card-body">
              <h5 class="card-title">Template</h5>
              <table class="table table-hover" id="templateTable">
                <thead>
                  <tr>
                    <th class="d-none">ID</th>
                    <th scope="col">No</th>
                    <th scope="col">Pesan</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- isi -->
                </tbody>
              </table>
              <!-- tamplate action -->
              <div class="d-flex justify-content-end">
                <!-- tambah -->
                <button
                  type="button"
                  class="btn btn-primary me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#TambahTemplateModal"
                >
                  <i class="bi bi-plus"></i>
                </button>
                <!-- Modal -->
                <div
                  class="modal fade"
                  id="TambahTemplateModal"
                  tabindex="-1"
                  aria-labelledby="TambahTemplateModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1
                          class="modal-title fs-5"
                          id="TambahTemplateModalLabel"
                        >
                          Tambah Template
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="mb-3">
                          <label for="pesan" class="form-label">Pesan</label>
                          <textarea
                            class="form-control"
                            id="pesan"
                            rows="3"
                            placeholder="Assalamualaikum, {mrs}. Mohon Izin waktunya, saya {nama} dari kelas {kelas}. Perihal ..."
                          ></textarea>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onclick="tambahTemplate()"
                        >
                          <i class="bi bi-plus"></i>
                          Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end tambah -->

                <!-- hapus -->
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#HapusTemplateModal"
                >
                  <i class="bi bi-trash"></i>
                </button>
                <!-- Modal -->
                <div
                  class="modal fade"
                  id="HapusTemplateModal"
                  tabindex="-1"
                  aria-labelledby="HapusTemplateModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1
                          class="modal-title fs-5"
                          id="HapusTemplateModalLabel"
                        >
                          Hapus Template
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <table
                          class="table table-hover"
                          id="deleteTemplateModal"
                        >
                          <thead>
                            <tr>
                              <th class="d-none">id</th>
                              <th scope="col">No</th>
                              <th scope="col">Pesan</th>
                              <th scope="col">Hapus</th>
                            </tr>
                          </thead>
                          <tbody>
                            <!-- isi -->
                          </tbody>
                        </table>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Selesai
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end hapus -->
              </div>
            </div>
          </div>
        </div>

`


//tambah template tambahan
window.tambahTemplate = () => {
    let pesan = $("#pesan").val();
    tamplateTambahan.push(pesan);
    localStorage.setItem(
      "tamplateTambahan",
      JSON.stringify(tamplateTambahan)
    );
    location.reload();
  };

  //add template tambahan to select option
  let htmlTemplateOptionModal = "";
  tamplateTambahan.forEach((data, index) => {
    htmlTemplateOptionModal += `<option value="${index}">${data}</option>`;
  });
  $("#template").append(htmlTemplateOptionModal);

  //add template tambahan to pesan
  $("#template").change(function () {
    let pesan = tamplateTambahan[$("#template").val()];
    $("#pesan").val(pesan);
  });

  //change 

  //hapus template tambahan
  window.hapusTemplate = () => {
    let id = $(event.target).closest("tr").find("th:eq(0)").text();
    tamplateTambahan = tamplateTambahan.filter(
      (data, index) => index != id
    );
    localStorage.setItem(
      "tamplateTambahan",
      JSON.stringify(tamplateTambahan)
    );
    location.reload();
  };

  //list template on modal
  let htmlTemplateModal = "";
  tamplateTambahan.forEach((data, index) => {
    htmlTemplateModal += `
      <tr>
        <th class="d-none">${index + 1}</th><td>${
      index + 1
    }</td><td>${data}</td>
        <td>
          <button type="button" class="btn btn-danger" onclick="hapusTemplate()">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
      `;
  });