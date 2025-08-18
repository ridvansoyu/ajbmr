"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

type UserRole = 'admin' | 'editor' | 'author';

interface UserRoleRecord {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

interface UserWithRoles {
  id: string;
  email: string;
  full_name: string;
  institution?: string;
  created_at: string;
  updated_at: string;
  roles: UserRoleRecord[];
}

const availableRoles: UserRole[] = ['admin', 'editor', 'author'];

function getRoleDisplayName(role: UserRole) {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'editor':
      return 'Editor';
    case 'author':
      return 'Author';
    default:
      return role;
  }
}

export default function UserManagementPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = useMemo(() => user?.role === 'admin', [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const dummyUsers: UserWithRoles[] = [
        {
          id: 'admin-user-id',
          email: 'admin@journal.com',
          full_name: 'Aslı Kullanıcısı',
          institution: 'Test University',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          roles: [
            { id: '1', user_id: 'admin-user-id', role: 'admin', created_at: new Date().toISOString() },
            { id: '2', user_id: 'admin-user-id', role: 'editor', created_at: new Date().toISOString() },
          ],
        },
        {
          id: 'author-user-id',
          email: 'author1@example.com',
          full_name: 'Rıdvan Kullanıcısı',
          institution: 'Another University',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          roles: [{ id: '3', user_id: 'author-user-id', role: 'author', created_at: new Date().toISOString() }],
        },
      ];
      setUsers(dummyUsers);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (!isAdmin) {
    return <div className="container-custom py-16">Only admins can view this page.</div>;
  }

  const getUserRoles = (u: UserWithRoles) => u.roles.map((r) => r.role);
  const getAvailableRolesForUser = (u: UserWithRoles) => availableRoles.filter((r) => !getUserRoles(u).includes(r));

  const handleAddRole = async (_userId: string, _role: UserRole) => {
    alert('Demo: role added');
  };
  const handleRemoveRole = async (_userId: string, _role: UserRole) => {
    alert('Demo: role removed');
  };

  if (loading) {
    return <div className="container-custom py-16">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Kullanıcı Yönetimi</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{u.full_name}</div>
                      <div className="text-sm text-gray-500">{u.email}</div>
                      {u.institution && <div className="text-sm text-gray-500">{u.institution}</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      {getUserRoles(u).map((role) => (
                        <span key={role} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getRoleDisplayName(role)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <select
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                          onChange={(e) => {
                            const role = e.target.value as UserRole;
                            if (role) handleAddRole(u.id, role);
                          }}
                          value=""
                        >
                          <option value="">Rol Ekle</option>
                          {getAvailableRolesForUser(u).map((role) => (
                            <option key={role} value={role}>
                              {getRoleDisplayName(role)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {getUserRoles(u).map((role) => (
                          <button key={role} onClick={() => handleRemoveRole(u.id, role)} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200">
                            {getRoleDisplayName(role)} Kaldır
                          </button>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Rol Açıklamaları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableRoles.map((role) => (
            <div key={role} className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">{getRoleDisplayName(role)}</h3>
              <p className="text-sm text-gray-600">Demo açıklama</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


