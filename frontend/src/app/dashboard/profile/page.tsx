"use client";
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { 
  User, 
  Mail, 
  Building, 
  Phone, 
  Globe, 
  MapPin, 
  Plus, 
  X,
  Save,
  Edit3,
  Briefcase,
  GraduationCap,
  FileText
} from 'lucide-react';

interface ResearchField {
  id: string;
  name: string;
}

export default function ProfilePage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [newResearchField, setNewResearchField] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Profile data - using real user data where available
  const [profileData, setProfileData] = useState({
    firstName: user?.username?.split(' ')[0] || '',
    lastName: user?.username?.split(' ')[1] || '',
    email: user?.email || '',
    organization: '',
    department: '',
    position: '',
    phone: '',
    website: '',
    address: '',
    bio: '',
    researchFields: [] as ResearchField[]
  });

  // Available research fields from database
  const [availableResearchFields] = useState([
    { id: '1', name: 'Machine Learning' },
    { id: '2', name: 'Artificial Intelligence' },
    { id: '3', name: 'Healthcare Informatics' },
    { id: '4', name: 'Data Science' },
    { id: '5', name: 'Computer Vision' },
    { id: '6', name: 'Natural Language Processing' },
    { id: '7', name: 'Robotics' },
    { id: '8', name: 'Cybersecurity' },
    { id: '9', name: 'Software Engineering' },
    { id: '10', name: 'Database Systems' },
    { id: '11', name: 'Computer Networks' },
    { id: '12', name: 'Human-Computer Interaction' },
    { id: '13', name: 'Bioinformatics' },
    { id: '14', name: 'Quantum Computing' },
    { id: '15', name: 'Cloud Computing' }
  ]);

  // Fetch profile data from database
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        // In real app, this would be an API call
        // const response = await fetch('/api/profile');
        // const data = await response.json();
        // setProfileData(data);
        
        // For now, we'll use the user data from auth context
        if (user) {
          setProfileData(prev => ({
            ...prev,
            firstName: user.username?.split(' ')[0] || '',
            lastName: user.username?.split(' ')[1] || '',
            email: user.email || ''
          }));
        }
      } catch (error) {
        showError('PROFILE.FETCH_ERROR');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user, showError]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // In real app, this would make an API call
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profileData)
      // });
      
      // if (response.ok) {
      //   showSuccess('PROFILE.UPDATE_SUCCESS');
      //   setIsEditing(false);
      // } else {
      //   showError('PROFILE.UPDATE_ERROR');
      // }
      
      // For now, just show success
      showSuccess('PROFILE.UPDATE_SUCCESS');
      setIsEditing(false);
    } catch (error) {
      showError('PROFILE.UPDATE_ERROR');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  const addResearchField = (fieldId: string) => {
    const fieldToAdd = availableResearchFields.find(field => field.id === fieldId);
    if (fieldToAdd && !profileData.researchFields.find(field => field.id === fieldId)) {
      setProfileData(prev => ({
        ...prev,
        researchFields: [...prev.researchFields, fieldToAdd]
      }));
    }
  };

  const removeResearchField = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      researchFields: prev.researchFields.filter(field => field.id !== id)
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              {language === 'en' ? 'Personal Information' : 'Kişisel Bilgiler'}
            </h1>
            <p className="text-gray-600 mt-1">
              {language === 'en' 
                ? 'Manage your profile information and research fields.'
                : 'Profil bilgilerinizi ve araştırma alanlarınızı yönetin.'}
            </p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {language === 'en' ? 'Cancel' : 'İptal'}
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading 
                    ? (language === 'en' ? 'Saving...' : 'Kaydediliyor...')
                    : (language === 'en' ? 'Save Changes' : 'Değişiklikleri Kaydet')
                  }
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 flex items-center"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Edit Profile' : 'Profili Düzenle'}
              </button>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                {language === 'en' ? 'First Name' : 'Ad'}
              </label>
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                {language === 'en' ? 'Last Name' : 'Soyad'}
              </label>
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                {language === 'en' ? 'Email' : 'E-posta'}
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                {language === 'en' ? 'Phone' : 'Telefon'}
              </label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Building className="h-4 w-4 text-gray-400 mr-2" />
                {language === 'en' ? 'Organization' : 'Kurum'}
              </label>
              <input
                type="text"
                value={profileData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <GraduationCap className="h-4 w-4 text-gray-400 mr-2" />
                {language === 'en' ? 'Department' : 'Bölüm'}
              </label>
              <input
                type="text"
                value={profileData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                {language === 'en' ? 'Position' : 'Pozisyon'}
              </label>
              <input
                type="text"
                value={profileData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Globe className="h-4 w-4 text-gray-400 mr-2" />
                {language === 'en' ? 'Website' : 'Web Sitesi'}
              </label>
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <MapPin className="h-4 w-4 text-gray-400 mr-2" />
              {language === 'en' ? 'Address' : 'Adres'}
            </label>
            <textarea
              value={profileData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Biography */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FileText className="h-4 w-4 text-gray-400 mr-2" />
              {language === 'en' ? 'Biography' : 'Biyografi'}
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Research Fields */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {language === 'en' ? 'Research Fields' : 'Araştırma Alanları'}
            </h2>
          </div>
          <div className="p-6">
            {/* Add New Research Field */}
            {isEditing && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'en' ? 'Add Research Field' : 'Araştırma Alanı Ekle'}
                </label>
                <div className="flex">
                  <select
                    value={newResearchField}
                    onChange={(e) => {
                      if (e.target.value) {
                        addResearchField(e.target.value);
                        setNewResearchField('');
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">
                      {language === 'en' ? 'Select a research field' : 'Araştırma alanı seçin'}
                    </option>
                    {availableResearchFields
                      .filter(field => !profileData.researchFields.find(selected => selected.id === field.id))
                      .map((field) => (
                        <option key={field.id} value={field.id}>
                          {field.name}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={() => {
                      if (newResearchField) {
                        addResearchField(newResearchField);
                        setNewResearchField('');
                      }
                    }}
                    className="px-4 py-2 bg-primary-600 text-white border border-primary-600 rounded-r-md hover:bg-primary-700 flex items-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Research Fields List */}
            <div className="space-y-3">
              {profileData.researchFields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-900">{field.name}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeResearchField(field.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {profileData.researchFields.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                {language === 'en' 
                  ? 'No research fields added yet.'
                  : 'Henüz araştırma alanı eklenmemiş.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}