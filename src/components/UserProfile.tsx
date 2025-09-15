'use client';

import React, { useState, useEffect } from 'react';
import { useAuth, useAuthUser } from '@/store/auth';
import { userAPI } from '@/lib/api';
import { useToast } from '@/components/Toast';
import LoadingSkeleton, { ProductGridSkeleton } from '@/components/LoadingSkeleton';

interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

interface ProfileFormData {
  name: string;
  phone: string;
  avatar: string;
}

export const UserProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState<Partial<Address>>({
    type: 'shipping',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
    isDefault: false,
  });
  
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    name: user?.name || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
  });

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const userAddresses = await userAPI.getAddresses();
      setAddresses(userAddresses);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error!',
        message: 'Failed to fetch addresses',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const updatedUser = await userAPI.updateProfile(profileForm);
      updateUser(updatedUser);
      
      addToast({
        type: 'success',
        title: 'Success!',
        message: 'Profile updated successfully',
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error!',
        message: error instanceof Error ? error.message : 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (editingAddress) {
        await userAPI.updateAddress(editingAddress.id, addressForm);
        addToast({
          type: 'success',
          title: 'Success!',
          message: 'Address updated successfully',
        });
      } else {
        await userAPI.addAddress(addressForm);
        addToast({
          type: 'success',
          title: 'Success!',
          message: 'Address added successfully',
        });
      }
      
      setIsAddressFormOpen(false);
      setEditingAddress(null);
      resetAddressForm();
      fetchAddresses();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error!',
        message: error instanceof Error ? error.message : 'Failed to save address',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddressEdit = (address: Address) => {
    setEditingAddress(address);
    setAddressForm(address);
    setIsAddressFormOpen(true);
  };

  const handleAddressDelete = async (addressId: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        setLoading(true);
        await userAPI.deleteAddress(addressId);
        
        addToast({
          type: 'success',
          title: 'Success!',
          message: 'Address deleted successfully',
        });
        
        fetchAddresses();
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Error!',
          message: error instanceof Error ? error.message : 'Failed to delete address',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const resetAddressForm = () => {
    setAddressForm({
      type: 'shipping',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      phone: '',
      isDefault: false,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setAddressForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setAddressForm(prev => ({ ...prev, [name]: value }));
    }
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  if (loading) {
    return <ProductGridSkeleton count={4} />;
  }

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
        
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profileForm.name}
                onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={profileForm.phone}
                onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar URL
              </label>
              <input
                type="url"
                name="avatar"
                value={profileForm.avatar}
                onChange={(e) => setProfileForm(prev => ({ ...prev, avatar: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>

      {/* Addresses Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Addresses</h2>
          <button
            onClick={() => {
              setIsAddressFormOpen(true);
              setEditingAddress(null);
              resetAddressForm();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add New Address
          </button>
        </div>

        {/* Addresses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    address.type === 'shipping' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {address.type === 'shipping' ? 'Shipping' : 'Billing'}
                  </span>
                  {address.isDefault && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddressEdit(address)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleAddressDelete(address.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-900">
                <p className="font-medium">{address.firstName} {address.lastName}</p>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.postalCode}</p>
                <p>{address.country}</p>
                <p className="mt-2">{address.phone}</p>
              </div>
            </div>
          ))}
        </div>

        {addresses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No addresses found. Add your first address to get started.</p>
          </div>
        )}
      </div>

      {/* Address Form Modal */}
      {isAddressFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button
                onClick={() => {
                  setIsAddressFormOpen(false);
                  setEditingAddress(null);
                  resetAddressForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Type
                  </label>
                  <select
                    name="type"
                    value={addressForm.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="shipping">Shipping</option>
                    <option value="billing">Billing</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={addressForm.isDefault}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Set as default address
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={addressForm.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={addressForm.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  value={addressForm.street}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={addressForm.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={addressForm.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={addressForm.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={addressForm.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={addressForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddressFormOpen(false);
                    setEditingAddress(null);
                    resetAddressForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingAddress ? 'Update Address' : 'Add Address')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
