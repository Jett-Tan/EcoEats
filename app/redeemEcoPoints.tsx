import { Icon } from '@/components/navigation/Icon';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Reward {
    id: string;
    name: string;
    description?: string;
    pointsRequired: number;
    iconName: string;
}

const rewards: Reward[] = [
    { id: '1', name: 'Discount Voucher', pointsRequired: 50, iconName: 'pricetag' },
    { id: '2', name: 'Free Coffee', pointsRequired: 30, iconName: 'cafe' },
    { id: '3', name: 'Movie Ticket', pointsRequired: 100, iconName: 'ticket' },
];

const RedeemEcoPoints: React.FC = () => {
    const [ecoPoints, setEcoPoints] = useState(150);
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleRedeemPress = (reward: Reward) => {
        setSelectedReward(reward);
        setModalVisible(true);
    };

    const confirmRedemption = () => {
        if (selectedReward && ecoPoints >= selectedReward.pointsRequired) {
            setEcoPoints(ecoPoints - selectedReward.pointsRequired);
            setModalVisible(false);
            setSelectedReward(null);
            // Handle additional logic like updating backend or state
        }
    };

    return (
        <><Stack.Screen options={{ title: '', headerBackTitleVisible: false }} /><View style={styles.container}>
            <Text style={styles.title}>Redeem Eco Points</Text>
            <Text style={styles.points}>Eco Points Available: {ecoPoints}</Text>
            <FlatList
                data={rewards}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.rewardContainer}>
                        <Icon size={40} name={item.iconName} color="black" />
                        <View style={styles.rewardDetails}>
                            <Text style={styles.rewardName}>{item.name}</Text>
                            {item.description && <Text style={styles.rewardDescription}>{item.description}</Text>}
                            <Text style={styles.rewardPoints}>{item.pointsRequired} Points</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.redeemButton}
                            onPress={() => handleRedeemPress(item)}
                            disabled={ecoPoints < item.pointsRequired}
                        >
                            <Text style={styles.redeemButtonText}>Redeem</Text>
                        </TouchableOpacity>
                    </View>
                )} />
            {selectedReward && (
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Confirm Redemption</Text>
                            <Text style={styles.modalMessage}>
                                Are you sure you want to redeem {selectedReward.name} for {selectedReward.pointsRequired} points?
                            </Text>
                            <View style={styles.modalButtons}>
                                <Button title="Yes" onPress={confirmRedemption} />
                                <Button title="No" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View></>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    points: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 16,
    },
    rewardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    rewardImage: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    rewardDetails: {
        marginLeft: 16,
        flex: 1,
    },
    rewardName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    rewardDescription: {
        fontSize: 14,
        color: '#666',
    },
    rewardPoints: {
        fontSize: 16,
        marginTop: 4,
    },
    redeemButton: {
        backgroundColor: '#49B379',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    redeemButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
    backButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%',
    },
});

export default RedeemEcoPoints;
