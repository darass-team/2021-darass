package com.darass.darass.project.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.darass.darass.project.service.CustomSecretKeyFactory;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Project 클래스")
class ProjectTest {

    @DisplayName("isSame 메서드는 같은 프로젝트 키가 주어지면, true를 반환한다.")
    @Test
    void isSame() {
        //given
        String projectKey = "projectKey";
        Project project = new Project(null, "프로젝트 이름", new CustomSecretKeyFactory(projectKey));

        //then
        boolean result = project.isSame(projectKey);

        //when
        assertThat(result).isTrue();
    }

    @DisplayName("isSame 메서드는 다른 프로젝트 키가 주어지면, false를 반환한다.")
    @Test
    void isSame_fail() {
        //given
        String projectKey = "projectKey";
        Project project = new Project(null, "프로젝트 이름", new RandomSecretKeyFactory());

        //then
        boolean result = project.isSame("different" + projectKey);

        //when
        assertThat(result).isFalse();
    }
}