import React, { useState } from 'react';
import { getTeams, addTeam } from './backend';

type Team = {
    _id: string;
    name: string;
};

function AdminAddTeam() {
    const [teamId, setTeamId] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await addTeam(teamId, name);
            if (response.status === 200) {
                setTeamId('');
                setName('');
            } else {
                throw new Error('Failed to add team');
            }
        } catch (error) {
            console.error('Failed to add team:', error);
        }
    };

    return (
        <div>
            <h1>AdminAddTeam.view</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Team ID"
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Team Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Add Team</button>
            </form>
        </div>
    );
}

export default AdminAddTeam;