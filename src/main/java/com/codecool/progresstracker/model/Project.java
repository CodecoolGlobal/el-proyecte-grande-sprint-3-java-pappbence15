package com.codecool.progresstracker.model;

import com.codecool.progresstracker.model.goal.ProjectGoal;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class Project {
    private final UUID id;
    private final String name;
    private List<UserStory> userStories;
    private final User owner;
    private List<User> admins;
    private List<ProjectGoal> projectGoals;

    public UserStory findStory(UUID storyId) throws NullPointerException{
        for (UserStory userStory: userStories) {
            if (userStory.getId().equals(storyId)){
                return userStory;
            }
        }
        throw new NullPointerException("No userStory found with given id.");
    }

    public double getPercentage(){
        if (userStories.size()==0){
            return 0;
        }
        return userStories.stream().map(UserStory::getCurrentPercent).reduce(0.0, Double::sum)
                / userStories.size();
    }

    public void addStory(UserStory userStory){
        this.userStories.add(userStory);
    }

    public void addProjectGoal(ProjectGoal projectGoal){
        this.projectGoals.add(projectGoal);
    }
}