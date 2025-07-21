import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context";
import { useFetch } from "../hooks/usefetch";
import useLocalStorageState from "../hooks/useLocalStorageState";
import DateRangeFilter2 from "../common/DateRangeFilter2";
import { dateFormat } from "../utiles/dateFormat";
import { addSlotApi, updateSlotApi } from "../../api/slotApi";
import { getDateRange } from "../common/DateRangeFilter2/utils";

// --- Slot Modal (unchanged) ---
const SlotFormModal = ({ show, onHide, onSaved, user, slot = null, title }) => {
  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slot) {
      // Convert UTC to local time for editing
      const startTime = new Date(slot.start_time);
      const endTime = new Date(slot.end_time);
      setFormData({
        start_time: startTime.toISOString().slice(0, 16),
        end_time: endTime.toISOString().slice(0, 16),
      });
    } else {
      // Default to next hour for new slots
      const now = new Date();
      const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
      const hourAfter = new Date(nextHour.getTime() + 30 * 60 * 1000);
      setFormData({
        start_time: nextHour.toISOString().slice(0, 16),
        end_time: hourAfter.toISOString().slice(0, 16),
      });
    }
  }, [slot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        doctor: user?.id,
        hospital: user?.selectedHostiptal?.id,
        start_time: new Date(formData.start_time).toISOString(),
        end_time: new Date(formData.end_time).toISOString(),
      };

      if (slot) {
        payload.id = slot.id;
      }

      const request = slot ? updateSlotApi : addSlotApi;
      const response = await request(payload);

      if (!response.ok) {
        throw new Error("Failed to save slot");
      }

      onSaved();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content rounded-3">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              disabled={loading}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="start_time" className="form-label">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="start_time"
                  value={formData.start_time}
                  onChange={(e) => handleChange("start_time", e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="end_time" className="form-label">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="end_time"
                  value={formData.end_time}
                  onChange={(e) => handleChange("end_time", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onHide}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                )}
                {slot ? "Update Slot" : "Create Slot"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- SlotManager UI ---
const SlotManager = ({ dateFilter, showCreateModal, setShowCreateModal }) => {
  const { user } = useAuthContext();
  const [editingSlot, setEditingSlot] = useState(null);

  const response = useFetch({
    method: "GET",
    request: "slots/slot/",
	dontCall: !dateFilter.start_date || !dateFilter.end_date,
    params: {
      doctor_id: user?.id ?? "",
      hospital_id: user?.selectedHostiptal?.id,
      is_blocked: true,
      ...dateFilter,
    },
  });

  const slots = response?.data || [];

  // Group slots by date
  const groupedSlots = slots.reduce((acc, slot) => {
    const date = new Date(slot.start_time).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(slot);
    return acc;
  }, {});

  const handleEditSlot = (slot) => setEditingSlot(slot);
  const handleSlotSaved = async () => {
    response.refetch();
    setShowCreateModal(false);
    setEditingSlot(null);
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (response?.loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (!response?.loading && response?.error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading slots: {response.error}
      </div>
    );
  }
  if (!response?.loading && slots.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
        <h6 className="text-muted">No slots found</h6>
        <p className="text-muted">Create your first slot to get started</p>
      </div>
    );
  }
  return (
    <>
      {Object.keys(groupedSlots).length > 0 && (
        <div>
          {Object.entries(groupedSlots)
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .map(([date, dateSlots]) => (
              <div key={date} className="mb-4">
                {/* Date Header */}
                <div
                  className="bg-light p-3 rounded-top border"
                  style={{ background: "#f2f6fa" }}
                >
                  <h5>
                    {formatDate(date)}
                  </h5>
                  <small className="text-muted">
                    {dateSlots.length} slot{dateSlots.length !== 1 ? "s" : ""}
                  </small>
                </div>
                {/* Slots Grid */}
                <div
                  className="border border-top-0 rounded-bottom p-3"
                  style={{ background: "#f8fafd" }}
                >
                  <div className="row g-2">
                    {dateSlots
                      .sort(
                        (a, b) =>
                          new Date(a.start_time) - new Date(b.start_time)
                      )
                      .map((slot) => (
                        <div key={slot.id} className="col-auto">
                          <div
                            className={`border rounded p-2 ${
                              slot.is_blocked
                                ? "bg-danger bg-opacity-10 border-danger"
                                : "bg-success bg-opacity-10 border-success"
                            }`}
                            style={{
                              width: "110px",
                              fontSize: "0.75rem",
                              background: slot.is_blocked
                                ? "#ffeaea"
                                : "#e6f8f5",
                            }}
                          >
                            {/* Time */}
                            <div
                              className="fw-bold text-center mb-1"
                              style={{ fontSize: "0.8rem", lineHeight: "1.1" }}
                            >
                              {formatTime(slot.start_time)
                                .replace(/:\d{2}/, "")
                                .replace(" ", "")
                                .toLowerCase()}
                              -
                              {formatTime(slot.end_time)
                                .replace(/:\d{2}/, "")
                                .replace(" ", "")
                                .toLowerCase()}
                            </div>
                            {/* Duration and Edit */}
                            <div className="d-flex align-items-center justify-content-between">
                              <small
                                className="text-muted"
                                style={{ fontSize: "0.7rem" }}
                              >
                                {Math.round(
                                  (new Date(slot.end_time) -
                                    new Date(slot.start_time)) /
                                    (1000 * 60)
                                )}
                                m
                              </small>
                              <button
                                className="btn p-0 text-primary"
                                onClick={() => handleEditSlot(slot)}
                                title="Edit Slot"
                                style={{ fontSize: "0.8rem", lineHeight: "1" }}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Create Slot Modal */}
      {showCreateModal && (
        <SlotFormModal
          show={showCreateModal}
          onHide={() => setShowCreateModal(false)}
          onSaved={handleSlotSaved}
          user={user}
          title="Create New Slot"
        />
      )}
      {/* Edit Slot Modal */}
      {editingSlot && (
        <SlotFormModal
          show={!!editingSlot}
          onHide={() => setEditingSlot(null)}
          onSaved={handleSlotSaved}
          user={user}
          slot={editingSlot}
          title="Edit Slot"
        />
      )}
    </>
  );
};

// --- Main Component ---
const Slots = () => {
	const { start, end } = getDateRange('next7')

  const [dateFilter, setDateFilter] = useLocalStorageState(
    "candidate_dateFilter",
    { date_from: start, date_to: end }
  );
console.log({ dateFilter });

  const [showCreateModal, setShowCreateModal] = useState(false);

  const onFilter = ({ start, end }) => {
    setDateFilter({
      date_from: start,
      date_to: end,
    });
  };

  const handleCreateSlot = () => setShowCreateModal(true);

  const onClear = () => {
    setDateFilter({ date_from: "", date_to: "" });
  };
console.log({ dateFilter });

  return (
    <div style={{ minHeight: "100%", background: "#f6f8fb" }}>
      <div className="container-fluid py-4">
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <header
            className="d-flex align-items-center justify-content-between px-4 py-3 shadow-sm"
            style={{
              background: "#fff",
              borderBottom: "1px solid #e8eaef",
              minHeight: 60,
              fontWeight: 600,
              fontSize: "1.12rem",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <h5>
              Slots
            </h5>
            <div className="d-flex align-items-center" style={{ gap: 10 }}>
              <div className="d-flex align-items-center" style={{ gap: 10 }}>
                <span style={{ fontWeight: 500, color: "#5e6e82" }}>Date:</span>
                <DateRangeFilter2
                hidePreset
                  onFilter={onFilter}
                  onClear={onClear}
                  hideClear={true}
                  date={{
                    start: dateFilter.date_from
                      ? new Date(dateFilter.date_from)
                      : null,
                    end: dateFilter.date_to
                      ? new Date(dateFilter.date_to)
                      : null,
                  }}
                />
              </div>
              <button className="btn btn-primary" onClick={handleCreateSlot}>
                <i className="fas fa-plus me-2"></i>
                Create New Slot
              </button>
            </div>
          </header>
          <div className="shadow-sm bg-white rounded-bottom p-3">
            <SlotManager
              dateFilter={
                dateFilter.date_from && dateFilter.date_to
                  ? {
                      start_date: dateFormat(dateFilter.date_from),
                      end_date: dateFormat(dateFilter.date_to),
                    }
                  : {}
              }
              showCreateModal={showCreateModal}
              setShowCreateModal={setShowCreateModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slots;
