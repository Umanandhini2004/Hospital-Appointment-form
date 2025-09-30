import React, { useState } from 'react';

export default function PatientAppointmentForm() {
  const [showModal, setShowModal] = useState(false);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [patients, setPatients] = useState([
    { id: 'patient1', name: 'John Doe' },
    { id: 'patient2', name: 'Jane Smith' },
    { id: 'patient3', name: 'Robert Johnson' }
  ]);
  
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    contact: ''
  });

  const [formData, setFormData] = useState({
    patientSelection: '',
    date: '',
    timeRange: '09:00 AM - 10:00 AM',
    patientName: '',
    gender: '',
    email: '',
    phone: '',
    phoneCode: '233',
    doctor: '',
    appointmentPriority: '',
    liveConsultant: '',
    status: '',
    nurse: '',
    caseId: 'CAS1779344205',
    encounterId: 'ENC1779344205',
    paymentMode: 'Cash',
    paymentStatus: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const doctors = [
    'George William',
    'Helen Jones',
    'Kofi Owusu Boahene',
    'Akwasi Owusu',
    'Samuel Mensah',
    'kofi Boahene',
    'Jessica Nsowah'
  ];

  const phoneCodes = ['233', '1', '44', '91', '234', '254'];
  const timeRanges = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNewPatientChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPatient = () => {
    if (newPatient.name.trim() && newPatient.age && newPatient.gender && newPatient.contact) {
      const patientId = `patient${patients.length + 1}`;
      setPatients(prev => [...prev, { id: patientId, name: newPatient.name }]);
      
      // Auto-fill form with new patient data
      setFormData(prev => ({
        ...prev,
        patientSelection: patientId,
        patientName: newPatient.name,
        gender: newPatient.gender,
        phone: newPatient.contact
      }));

      // Reset new patient form
      setNewPatient({ name: '', age: '', gender: '', contact: '' });
      setShowAddPatientModal(false);
      
      alert(` Patient "${newPatient.name}" added successfully!`);
    } else {
      alert(' Please fill all patient details');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.timeRange) newErrors.timeRange = 'Time Range is required';
    if (!formData.patientName.trim()) newErrors.patientName = 'Patient Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.doctor) newErrors.doctor = 'Doctor is required';
    if (!formData.liveConsultant) newErrors.liveConsultant = 'Live Consultant is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmittedData(formData);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeAddPatientModal = () => {
    setShowAddPatientModal(false);
    setNewPatient({ name: '', age: '', gender: '', contact: '' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', padding: '20px 30px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <h2 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '22px', fontWeight: '600' }}>Select Patient</h2>
            <select 
              name="patientSelection"
              value={formData.patientSelection}
              onChange={handleInputChange}
              style={{ width: '100%', maxWidth: '300px', padding: '10px', borderRadius: '6px', border: 'none', fontSize: '14px' }}
            >
              <option value="">Select Patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => setShowAddPatientModal(true)}
            style={{ background: 'white', color: '#0ea5e9', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '14px' }}
          >
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>+</span>
            New Patient
          </button>
        </div>

        {/* Form Content */}
        <div style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            
            {/* Date */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                📅 Date <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: `1px solid ${errors.date ? '#ef4444' : '#d1d5db'}`, borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              />
              {errors.date && <span style={{ color: '#ef4444', fontSize: '12px', display: 'block', marginTop: '4px' }}>{errors.date}</span>}
            </div>

            {/* Time Range */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                🕐 Time Range <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                name="timeRange"
                value={formData.timeRange}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                {timeRanges.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            {/* Patient Name */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                👤 Patient Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                placeholder="Enter patient name"
                style={{ width: '100%', padding: '10px', border: `1px solid ${errors.patientName ? '#ef4444' : '#d1d5db'}`, borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              />
              {errors.patientName && <span style={{ color: '#ef4444', fontSize: '12px', display: 'block', marginTop: '4px' }}>{errors.patientName}</span>}
            </div>

            {/* Gender */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                ⚧ Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                ✉️ Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                 Phone <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleInputChange}
                  style={{ width: '80px', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                >
                  {phoneCodes.map(code => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  style={{ flex: 1, padding: '10px', border: `1px solid ${errors.phone ? '#ef4444' : '#d1d5db'}`, borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>
              {errors.phone && <span style={{ color: '#ef4444', fontSize: '12px', display: 'block', marginTop: '4px' }}>{errors.phone}</span>}
            </div>

            {/* Doctor */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                🩺 Doctor <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: `1px solid ${errors.doctor ? '#ef4444' : '#d1d5db'}`, borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="">Select Doctor</option>
                {doctors.map(doc => (
                  <option key={doc} value={doc}>{doc}</option>
                ))}
              </select>
              {errors.doctor && <span style={{ color: '#ef4444', fontSize: '12px', display: 'block', marginTop: '4px' }}>{errors.doctor}</span>}
            </div>

            {/* Appointment Priority */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                ⚠️ Appointment Priority
              </label>
              <select
                name="appointmentPriority"
                value={formData.appointmentPriority}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="">-Select-</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Live Consultant */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                🎥 Live Consultant (Video) <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                name="liveConsultant"
                value={formData.liveConsultant}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: `1px solid ${errors.liveConsultant ? '#ef4444' : '#d1d5db'}`, borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="">-Select-</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.liveConsultant && <span style={{ color: '#ef4444', fontSize: '12px', display: 'block', marginTop: '4px' }}>{errors.liveConsultant}</span>}
            </div>

            {/* Status */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                📊 Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="">-Select-</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Nurse */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                👩‍⚕️ Nurse
              </label>
              <input
                type="text"
                name="nurse"
                value={formData.nurse}
                onChange={handleInputChange}
                placeholder="Enter nurse name"
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            {/* Case ID - NOW EDITABLE */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                📋 Case ID
              </label>
              <input
                type="text"
                name="caseId"
                value={formData.caseId}
                onChange={handleInputChange}
                placeholder="Enter case ID"
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            {/* Encounter ID - NOW EDITABLE */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                📝 Encounter ID
              </label>
              <input
                type="text"
                name="encounterId"
                value={formData.encounterId}
                onChange={handleInputChange}
                placeholder="Enter encounter ID"
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            {/* Payment Mode */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                💳 Payment Mode
              </label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="Insurance">Insurance</option>
                <option value="Mobile Money">Mobile Money</option>
              </select>
            </div>

            {/* Payment Status */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                💰 Payment Status
              </label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="">-Select-</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
            <button
              onClick={handleSubmit}
              style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', color: 'white', border: 'none', padding: '12px 40px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.4)', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '600' }}> Add New Patient</h3>
              <button 
                onClick={closeAddPatientModal} 
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px', fontWeight: 'bold', padding: '0', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ×
              </button>
            </div>
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                    Patient Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newPatient.name}
                    onChange={handleNewPatientChange}
                    placeholder="Enter full name"
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                    Age <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={newPatient.age}
                    onChange={handleNewPatientChange}
                    placeholder="Enter age"
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                    Gender <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="gender"
                    value={newPatient.gender}
                    onChange={handleNewPatientChange}
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                    Contact Number <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={newPatient.contact}
                    onChange={handleNewPatientChange}
                    placeholder="Enter phone number"
                    style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  onClick={closeAddPatientModal}
                  style={{ background: '#e5e7eb', color: '#374151', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPatient}
                  style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '80vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
              <h3 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '600' }}>✅ Appointment Details Submitted</h3>
              <button 
                onClick={closeModal} 
                style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '24px', fontWeight: 'bold', padding: '0', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ×
              </button>
            </div>
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'grid', gap: '15px' }}>
                {submittedData && Object.entries(submittedData).map(([key, value]) => (
                  value && key !== 'patientSelection' && (
                    <div key={key} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '10px' }}>
                      <strong style={{ color: '#374151', textTransform: 'capitalize', fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </strong>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>{value}</span>
                    </div>
                  )
                ))}
              </div>
              <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={closeModal}
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', border: 'none', padding: '12px 40px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}