import {StatusBar} from 'expo-status-bar';
import {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList} from 'react-native';
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [courseGoals, setCourseGoals] = useState([]);

    function startAddGoalHandler() {
        setModalIsVisible(true)
    }

    function endAddGoalHandler() {
        setModalIsVisible(false)
    }

    function addGoalHandler(enteredGoalText) {
        setCourseGoals(currentGoalCourse => [...currentGoalCourse, {
            text: enteredGoalText,
            id: Math.random().toString()
        }]);
        endAddGoalHandler()
    }

    function deleteGoalHandler(id) {
        setCourseGoals(currentCourseGoal => {
            return currentCourseGoal.filter((goal) => goal.id !== id)
        })
    }

    return (
        <>
            <StatusBar style='light'/>
            <View style={styles.appContainer}>

                <Button title={'Add New Goal'} color={"#7c43c5"} onPress={startAddGoalHandler}/>

                <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/>

                <View style={styles.goalsContainer}>
                    <FlatList data={courseGoals} renderItem={itemData => {
                        return <GoalItem text={itemData.item.text} id={itemData.item.id}
                                         onDeleteItem={deleteGoalHandler}/>
                    }} keyExtractor={(item, index) => {
                        return item.id
                    }}/>
                </View>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: '#1e085a',
    },
    goalsContainer: {
        flex: 5,
    },
});
