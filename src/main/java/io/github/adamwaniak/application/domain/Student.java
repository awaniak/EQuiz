package io.github.adamwaniak.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 0)
    @Column(name = "name", nullable = false)
    private String name;

    @DecimalMin(value = "0")
    @Column(name = "score")
    private Double score;

    private Instant startDate;

    private Instant endDate;

    @ManyToOne
    @JsonIgnoreProperties("students")
    private Quiz quiz;

    @OneToMany(mappedBy = "student", cascade = CascadeType.REMOVE)
    private Set<StudentAnswer> studentAnswers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Student name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getScore() {
        return score;
    }

    public Student score(Double score) {
        this.score = score;
        return this;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public Student quiz(Quiz quiz) {
        this.quiz = quiz;
        return this;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public Set<StudentAnswer> getStudentAnswers() {
        return studentAnswers;
    }

    public Student studentAnswers(Set<StudentAnswer> studentAnswers) {
        this.studentAnswers = studentAnswers;
        return this;
    }

    public Student addStudentAnswers(StudentAnswer studentAnswer) {
        this.studentAnswers.add(studentAnswer);
        studentAnswer.setStudent(this);
        return this;
    }

    public Student removeStudentAnswers(StudentAnswer studentAnswer) {
        this.studentAnswers.remove(studentAnswer);
        studentAnswer.setStudent(null);
        return this;
    }

    public void setStudentAnswers(Set<StudentAnswer> studentAnswers) {
        this.studentAnswers = studentAnswers;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Student setStartDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Student setEndDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Student student = (Student) o;
        if (student.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", score=" + score +
            ", startDate=" + startDate +
            ", endDate=" + endDate +
            ", quiz=" + quiz +
            ", studentAnswers=" + studentAnswers +
            '}';
    }
}
